/**
 * https://dev.mysql.com/doc/refman/8.0/en/referential-constraints-table.html
 *
 * Used constraints info table only with columns:
 * https://dev.mysql.com/doc/refman/8.0/en/key-column-usage-table.html
 */
export type MySQLForeignKey = {
    CONSTRAINT_CATALOG: 'def';
    CONSTRAINT_SCHEMA: string;
    CONSTRAINT_NAME: string;
    TABLE_CATALOG: 'def';
    TABLE_SCHEMA: string;
    TABLE_NAME: string;
    COLUMN_NAME: string;
    ORDINAL_POSITION: number;
    POSITION_IN_UNIQUE_CONSTRAINT: number;
    REFERENCED_TABLE_SCHEMA: string;
    REFERENCED_TABLE_NAME: string;
    REFERENCED_COLUMN_NAME: string;
};
