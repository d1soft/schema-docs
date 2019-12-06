/**
 * https://dev.mysql.com/doc/refman/8.0/en/triggers-table.html
 */
export type MySQLTrigger = {
    TRIGGER_CATALOG: 'def';
    TRIGGER_SCHEMA: string;
    TRIGGER_NAME: string;
    EVENT_MANIPULATION: 'INSERT' | 'DELETE' | 'UPDATE';
    EVENT_OBJECT_CATALOG: 'def';
    EVENT_OBJECT_SCHEMA: string;
    EVENT_OBJECT_TABLE: string;
    ACTION_ORDER: number;
    ACTION_CONDITION: null;
    ACTION_STATEMENT: string;
    ACTION_ORIENTATION: 'ROW';
    ACTION_TIMING: 'BEFORE' | 'AFTER';
    ACTION_REFERENCE_OLD_TABLE: null;
    ACTION_REFERENCE_NEW_TABLE: null;
    ACTION_REFERENCE_OLD_ROW: 'OLD';
    ACTION_REFERENCE_NEW_ROW: 'NEW';
    CREATED: Date;
    SQL_MODE: string;
    DEFINER: string;
    CHARACTER_SET_CLIENT: string;
    COLLATION_CONNECTION: string;
    DATABASE_COLLATION: string;
};
