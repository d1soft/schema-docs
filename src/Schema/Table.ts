import { Column, ForeignKey, Index, Trigger } from './index';

export type Table = {
    name: string;
    collation?: string;
    comment: string;
    engine?: string;
    createdAt?: string;
    columns?: Column[];
    indexes?: Index[];
    foreigns?: ForeignKey[];
    triggers?: Trigger[];
    ddl?: string;
};
