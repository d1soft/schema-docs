export type SQLiteTable = {
    /**
     * Item type: table or index
     */
    type: 'table';

    /**
     * Item name
     */
    name: string;

    /**
     * Table name
     * = name if type = table
     */
    tbl_name: string;

    rootpage: number;

    /**
     * DDL statment
     */
    sql: string;
};
