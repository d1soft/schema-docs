import { ConfigFileDatabase } from './ConfigDatabase';
import { ConfigFileTemplater } from './ConfigTemplater';

export type ConfigFile = {
    /**
     * Databases connections
     */
    databases: ConfigFileDatabase[];

    /**
     * Templaters configuraiton (override template)
     */
    templaters: Array<string | ConfigFileTemplater>;

    /**
     * Output directory path
     */
    output: string;
};
