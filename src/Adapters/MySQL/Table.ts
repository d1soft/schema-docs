/**
 * https://dev.mysql.com/doc/refman/8.0/en/tables-table.html
 */
export type MySQLTable = {
    TABLE_CATALOG: 'def';
    TABLE_SCHEMA: 'BASE TABLE' | 'VIEW' | 'SYSTEM VIEW' | '';
    TABLE_NAME: string;
    TABLE_TYPE: string;
    ENGINE: string;
    VERSION: number;
    ROW_FORMAT: string;
    TABLE_ROWS: number;
    AVG_ROW_LENGTH: number;
    DATA_LENGTH: number;
    MAX_DATA_LENGTH: number;
    INDEX_LENGTH: number;
    DATA_FREE: number;
    AUTO_INCREMENT: number;
    CREATE_TIME: Date;
    UPDATE_TIME: Date;
    CHECK_TIME: Date | null;
    TABLE_COLLATION: string;
    CHECKSUM: any;
    CREATE_OPTIONS: string;
    TABLE_COMMENT: string;
};
