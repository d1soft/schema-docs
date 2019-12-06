export type SQLiteColumn = {
    /**
     * Column position
     */
    cid: number;

    /**
     * Column name
     */
    name: string;

    /**
     * Data type
     */
    type: string;

    /**
     * Is not null
     */
    notnull: 0 | 1;

    /**
     * Default value
     */
    dflt_value: string | number | null;

    /**
     * Is primary key
     */
    pk: 0 | 1;
};
