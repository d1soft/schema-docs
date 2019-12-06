/**
 * https://dev.mysql.com/doc/refman/8.0/en/routines-table.html
 */
export type MySQLRoutine = {
    SPECIFIC_NAME: string; // The name of the routine.
    ROUTINE_CATALOG: 'def';
    ROUTINE_SCHEMA: string;
    ROUTINE_NAME: string;
    ROUTINE_TYPE: 'PROCEDURE' | 'FUNCTION';
    DATA_TYPE: string | null;
    CHARACTER_MAXIMUM_LENGTH: number | null;
    CHARACTER_OCTET_LENGTH: number | null;
    NUMERIC_PRECISION: number | null;
    NUMERIC_SCALE: number | null;
    DATETIME_PRECISION: number | null;
    CHARACTER_SET_NAME: string | null;
    COLLATION_NAME: string | null;
    DTD_IDENTIFIER: string;
    ROUTINE_BODY: 'SQL';
    ROUTINE_DEFINITION: string;
    EXTERNAL_NAME: null;
    EXTERNAL_LANGUAGE: string;
    PARAMETER_STYLE: 'SQL';
    IS_DETERMINISTIC: 'NO' | 'YES';
    SQL_DATA_ACCESS:
        | 'CONTAINS SQL'
        | 'NO SQL'
        | 'READS SQL DATA'
        | 'MODIFIES SQL DATA';
    SQL_PATH: null;
    SECURITY_TYPE: 'DEFINER' | 'INVOKER';
    CREATED: Date;
    LAST_ALTERED: Date;
    SQL_MODE: string;
    ROUTINE_COMMENT: string;
    DEFINER: string;
    CHARACTER_SET_CLIENT: string;
    COLLATION_CONNECTION: string;
    DATABASE_COLLATION: string;
};
