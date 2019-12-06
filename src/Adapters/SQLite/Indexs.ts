export type SQLiteIndex = {
    /**
     * Table name
     *
     * ! It's additional field. Not represent at sqlite_master schema.
     * Adds at query that fetch all indexes !
     */
    readonly table: string;
    seq: number;
    name: string;
    unique: 0 | 1;
    origin: 'c' | 'pk';
    partial: 0 | 1;
};
