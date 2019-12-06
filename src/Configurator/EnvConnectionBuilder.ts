/// <reference types="typescript" />

import envfile from 'envfile';
import { IBuilderConfig } from './BuilderConfig';
import { StringIndexObject } from '../Utils';

export class EnvConnectionBuilder {
    public build(config: IBuilderConfig, connectionName: string): string {
        const env = envfile.parseFileSync<StringIndexObject>(config.path);
        const variables = config.connection.match(/\{(.*?)\}/gm);

        if (!variables) {
            throw new Error(
                `Configurator: Incorrect connection template <${config.connection}> for connection '${connectionName}'`
            );
        }

        variables.forEach((variable: string) => {
            const name = variable.replace(/[\{\}]/g, '');
            if (!env[name]) {
                throw new Error(
                    `Configurator: Can't find variable "${name}" at passed env file for connection '${connectionName}'`
                );
            }

            config.connection = config.connection.replace(variable, env[name]);
        });

        return config.connection;
    }
}
