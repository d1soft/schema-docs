import { parseJsonSync, StringIndexObject } from '../Utils';
import { IBuilderConfig } from './BuilderConfig';

export class JsonConnectionBuilder {
    public build(config: IBuilderConfig, connectionName: string): string {
        const json = parseJsonSync<StringIndexObject>(config.path);

        const variables = config.connection.match(/\{(.*?)\}/gm);

        if (!variables) {
            throw new Error(
                `Configurator: Incorrect connection template <${config.connection}> for connection '${connectionName}'`
            );
        }

        variables.forEach((variable: string) => {
            const name = variable.replace(/[\{\}]/g, '');
            const value = this.search(name, json);

            if (!value) {
                throw new Error(
                    `Configurator: Can't find variable "${name}" at passed json file for connection '${connectionName}'`
                );
            }

            config.connection = config.connection.replace(variable, value);
        });

        return config.connection;
    }

    private search(
        key: string,
        obj: StringIndexObject,
        separator: string = '.'
    ): string | undefined {
        const properties = key.split(separator);

        for(const property of properties) {
            if (!obj[property]) {
                return undefined;
            }

            if (typeof obj[property] !== 'object') {
                return obj[property];
            }

            obj = obj[property];
        }
    }
}
