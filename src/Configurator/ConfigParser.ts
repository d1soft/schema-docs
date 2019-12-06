import { resolve, dirname, isAbsolute } from 'path';
import { Config } from './Config';
import { ConfigDatabase } from './ConfigDatabase';
import { ConfigFile } from './File/Config';
import { ConfigFileDatabase } from './File/ConfigDatabase';
import { ConfigFileTemplater } from './File/ConfigTemplater';
import { ConfigTemplater } from './ConfigTemplater';
import { EnvConnectionBuilder } from './EnvConnectionBuilder';
import { JsonConnectionBuilder } from './JsonConnectionBuilder';
import { parseJsonSync } from '../Utils';

const DefaulTemplatesPaths: { [key: string]: string } = {
    'confluence-storage': resolve(
        __dirname,
        '..',
        './Templaters/ConfluenceStorage/template.html'
    ),
    'confluence-wiki': resolve(
        __dirname,
        '..',
        './Templaters/ConfluenceWiki/template.md'
    ),
    html: resolve(__dirname, '..', './Templaters/Html/template.html'),
    md: resolve(__dirname, '..', './Templaters/Markdown/template.md'),
};

export class ConfigParser {
    private readonly configPath: string;
    private readonly envBuilder: EnvConnectionBuilder;
    private readonly jsonBuilder: JsonConnectionBuilder;

    constructor(configPath: string) {
        this.configPath = configPath;
        this.envBuilder = new EnvConnectionBuilder();
        this.jsonBuilder = new JsonConnectionBuilder();
    }

    public parse(): Config | null {
        const configFile = parseJsonSync<ConfigFile>(this.configPath);

        if (!configFile.databases || configFile.databases.length === 0) {
            return null;
        }

        if (!configFile.templaters || configFile.templaters.length === 0) {
            configFile.templaters = ['html'];
        }

        const output = configFile.output 
            ? isAbsolute(configFile.output) 
                ? configFile.output
                : resolve(dirname(this.configPath), configFile.output)
            : resolve(dirname(this.configPath), 'schema-docs');

        configFile.output = output;

        const databases: ConfigDatabase[] = [];
        const templaters: ConfigTemplater[] = [];

        configFile.databases.forEach((db: ConfigFileDatabase, i: number) => {
            db.name = db.name || `Connection${i.toString()}`;

            const { erd, ignoreTables = [], name: connectionName } = db;

            const connection = this.connectionBuild(db);
            if (!connection) {
                throw new Error(
                    `Connection not passed: connection name ${name}`
                );
            }

            const adapter = this.getAdapter(connection);
            if (!adapter) {
                throw new Error(
                    `Unsupported adapter connection passed: connection name ${name}`
                );
            }

            const databaseName = this.getName(connection);
            if (!databaseName) {
                throw new Error(
                    `Can't retrieve database name from connection string: connection name ${name}`
                );
            }

            databases.push({
                adapter,
                connection,
                connectionName,
                databaseName,
                erd: erd === true,
                ignoreTables,
            });
        });

        configFile.templaters.forEach((t: ConfigFileTemplater | string) => {
            let name: string = '';
            let templatePath: string = '';

            if (typeof t === 'object') {
                const keys = Object.keys(t);
                if (!keys || keys.length > 1) {
                    throw new Error('Incorrect templater config');
                }

                name = keys[0];
                templatePath =
                    t[keys[0]].template || DefaulTemplatesPaths[keys[0]];
            } else if (typeof t === 'string') {
                name = t;
                templatePath = DefaulTemplatesPaths[name];
            }

            templaters.push({
                name,
                templatePath: templatePath ? resolve(templatePath) : '',
            });
        });

        return {
            databases,
            output: configFile.output,
            templaters,
        };
    }

    /**
     * Builds connection string from specified configuration method
     *
     * @param {ConfigFileDatabase} db Database configuration
     */
    private connectionBuild(db: ConfigFileDatabase): string | null {
        const { connection, envConfig, jsonConfig, name } = db;

        if (envConfig) {
            return this.envBuilder.build(envConfig, name);
        } else if (jsonConfig) {
            return this.jsonBuilder.build(jsonConfig, name);
        } else if (connection) {
            return connection;
        } else {
            return null;
        }
    }

    private getAdapter(connection: string): string | undefined {
        const matched = connection.match(/(mysql):\/\/.*/);
        return matched ? matched[1] : undefined;
    }

    private getName(connection: string): string | undefined {
        const matched = connection.match(
            /(mysql):\/\/(.*)(:(.*))?@(.*)(:(.*))?\/(?<dbname>.*)/
        );
        return matched && matched.groups ? matched.groups['dbname'] : undefined;
    }
}
