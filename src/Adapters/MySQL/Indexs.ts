/**
 * https://dev.mysql.com/doc/refman/8.0/en/statistics-table.html
 */
export type MySQLIndex = {
    TABLE_CATALOG: 'def';
    TABLE_SCHEMA: string;
    TABLE_NAME: string;
    NON_UNIQUE: 0 | 1;
    INDEX_SCHEMA: string;
    INDEX_NAME: string | 'PRIMARY';
    SEQ_IN_INDEX: number;
    COLUMN_NAME: string;
    COLLATION: 'A' | 'D' | null;
    CARDINALITY: number;
    SUB_PART: number | null;
    PACKED: any;
    NULLABLE: 'YES' | '' | null;
    INDEX_TYPE: 'BTREE' | 'FULLTEXT' | 'HASH' | 'RTREE';
    COMMENT: string;
    INDEX_COMMENT: string;
    IS_VISIBLE: 'YES' | 'NO';
    EXPRESSION: string;
};
