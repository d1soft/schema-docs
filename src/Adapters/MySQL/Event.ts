/**
 * https://dev.mysql.com/doc/refman/8.0/en/events-table.html
 */
export type MySQLEvent = {
    EVENT_CATALOG: 'def';
    EVENT_SCHEMA: string;
    EVENT_NAME: string;
    DEFINER: string;
    TIME_ZONE: string;
    EVENT_BODY: 'SQL';
    EVENT_DEFINITION: string;
    EVENT_TYPE: 'ONE TIME' | 'RECURRING';
    EXECUTE_AT: Date | null; // If the event's timing is determined by an EVERY clause instead of an AT clause (that is, if the event is recurring), the value of this column is NULL.
    INTERVAL_VALUE: number | null; // For a transient event, the value is always NULL.
    INTERVAL_FIELD: string | null; // For a transient event, the value is always NULL.
    SQL_MODE: string;
    STARTS: Date | null; // The start date and time for a recurring event.
    ENDS: Date | null; // If there is no ENDS clause affecting the timing of the event, this column is NULL
    STATUS: 'ENABLED' | 'DISABLED' | 'SLAVESIDE_DISABLED';
    ON_COMPLETION: 'PRESERVE' | 'NOT PRESERVE';
    CREATED: Date;
    LAST_ALTERED: Date;
    LAST_EXECUTED: Date | null;
    EVENT_COMMENT: string;
    ORIGINATOR: number; // if used replica - id of instance, or 0
    CHARACTER_SET_CLIENT: string;
    COLLATION_CONNECTION: string;
    DATABASE_COLLATION: string;
};
