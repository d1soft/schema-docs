import { Schema } from '../Schema';
import { ConfigDatabase } from '../Configurator/ConfigDatabase';

export interface IAdapter {
    createConnection(config: ConfigDatabase): Promise<this>;
    closeConnection(): Promise<this>;
    getSchema(): Promise<Schema>;
}
