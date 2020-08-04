/**
 * https://dev.mysql.com/doc/refman/8.0/en/partitions-table.html
 */
export type MySQLPartition = {
    TABLE_CATALOG: 'def';
    TABLE_SCHEMA: string;
    TABLE_NAME: string;
    PARTITION_NAME: string;
    SUBPARTITION_NAME: string | null;
    PARTITION_ORDINAL_POSITION: number | null;
    SUBPARTITION_ORDINAL_POSITION: number | null;
    PARTITION_METHOD: 
        | 'RANGE' 
        | 'LIST' 
        | 'HASH' 
        | 'LINEAR HASH' 
        | 'KEY' 
        | 'LINEAR KEY';
    SUBPARTITION_METHOD:
        | 'HASH' 
        | 'LINEAR HASH' 
        | 'KEY' 
        | 'LINEAR KEY'
        | null;
    PARTITION_EXPRESSION: string;
    SUBPARTITION_EXPRESSION: string | null;
    PARTITION_DESCRIPTION: number | string | null;
    TABLE_ROWS: number;
    AVG_ROW_LENGTH: number;
    DATA_LENGTH: number;
    MAX_DATA_LENGTH: number;
    INDEX_LENGTH: number;
    DATA_FREE: number;
    CREATE_TIME: string;
    UPDATE_TIME: string;
    CHECK_TIME: string;
    CHECKSUM: string | null;
    PARTITION_COMMENT: string;
    NODEGROUP: number;
    TABLESPACE_NAME: 'DEFAULT';
}