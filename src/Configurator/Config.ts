import { ConfigDatabase } from './ConfigDatabase';
import { ConfigTemplater } from './ConfigTemplater';

export type Config = {
    databases: ConfigDatabase[];
    templaters: ConfigTemplater[];
    output: string;
};
