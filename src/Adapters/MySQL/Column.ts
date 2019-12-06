/**
 * https://dev.mysql.com/doc/refman/8.0/en/columns-table.html
 */
export type MySQLColumn = {
    TABLE_CATALOG: 'def';
    TABLE_SCHEMA: string;
    TABLE_NAME: string;
    COLUMN_NAME: string;
    ORDINAL_POSITION: number;
    COLUMN_DEFAULT: string | null;
    IS_NULLABLE: 'YES' | 'NO';
    DATA_TYPE: string;
    CHARACTER_MAXIMUM_LENGTH: number;
    CHARACTER_OCTET_LENGTH: number;
    NUMERIC_PRECISION: number | null;
    NUMERIC_SCALE: number | null;
    DATETIME_PRECISION: number | null;
    CHARACTER_SET_NAME: string;
    COLLATION_NAME: string;
    COLUMN_TYPE: string;
    COLUMN_KEY: 'PRI' | 'UNI' | 'MUL';
    EXTRA: string;
    PRIVILEGES: string;
    COLUMN_COMMENT: string;
    GENERATION_EXPRESSION: string;
    SRS_ID: null;
};
