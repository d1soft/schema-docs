import { MySQLAdapter } from './Adapters/MySQL';
import { Config } from './Configurator/Config';
import { ConfigTemplater } from './Configurator/ConfigTemplater';
import { Schema } from './Schema';
import JsonTemplator from './Templaters/Json';
import TemplateFiller from './Templaters/TemplateFiller';
import { mkDirIfNotExists } from './Utils';
import { ERDGenerator } from './ERDGenerator';
import { join } from 'path';
import signale = require("signale");

export type ApplyTemplatersConfig = {
    schema: Schema,
    path: string,
    templaters: ConfigTemplater[]
}

class DocsGenerator {
    private readonly config: Config;
    private readonly filler: TemplateFiller;
    private readonly json: JsonTemplator;
    private readonly erd: ERDGenerator;

    private readonly mysql: MySQLAdapter;

    constructor(config: Config) {
        this.config = config;
        this.filler = new TemplateFiller();
        this.json = new JsonTemplator();
        this.mysql = new MySQLAdapter();
        this.erd = new ERDGenerator();
    }

    public async generate(): Promise<void> {
        mkDirIfNotExists(this.config.output);

        for (const db of this.config.databases) {
            switch (db.adapter) {
                case 'mysql': {
                    await this.mysql
                        .createConnection(db)
                        .then(() => this.mysql.getSchema())
                        .then((schema: Schema) => {
                            
                            const path = join(this.config.output, db.connectionName);
                            const templaters = this.config.templaters;

                            mkDirIfNotExists(path).then(() => {
                                this.applyTemplaters({
                                    path,
                                    schema,
                                    templaters,
                                });
                            });

                            if(db.erd) {
                                this.erd.build({
                                    connection: db,
                                    path,
                                    schema,
                                });
                            }

                            return schema;
                        });
                };
            }
        }
    }

    private applyTemplaters(config: ApplyTemplatersConfig) {
        const { path: outputPath, schema, templaters } = config;

        templaters.map((templater: ConfigTemplater) => {
            const { templatePath, name: templaterName } = templater;
            
            switch (templaterName) {
                case 'json':
                    this.json.build(schema, outputPath);
                    break;

                case 'html':
                case 'md':
                case 'confluence-wiki':
                case 'confluence-storage':
                    {
                        this.filler.build({
                            outputPath,
                            schema,
                            templatePath,
                            templaterName,
                        });
                    }
                    break;

                default:
                    throw new Error(`Unknown templater: ${templaterName}`);
            }
            
            signale.info(`Builded docs for ${schema.connectionName} in ${templaterName} to ${outputPath}`);
        });
    }
}

export { DocsGenerator };
