export type ConfigDatabase = {
    connectionName: string;
    databaseName: string;
    connection: string;
    adapter: string;
    ignoreTables: string[];
    erd: boolean;
};
