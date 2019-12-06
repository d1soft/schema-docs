type Config = {
    [name: string]: any;
};

export class BaseConnectionBuilder {
    public fill(config: Config, connection: string) {
        const variables = connection.match(/\{(.*?)\}/gm);

        if (!variables) {
            throw new Error(
                `Configurator: Incorrect connection template <${connection}>`
            );
        }

        variables.forEach((variable: string) => {
            const normalizedName = variable.replace(/[\{\}]/g, '');
            if (!config[normalizedName]) {
                throw new Error(
                    `Configurator: Can't find variable "${normalizedName}" at passed config file`
                );
            }

            connection = connection.replace(variable, config[normalizedName]);
        });

        return connection;
    }
}
