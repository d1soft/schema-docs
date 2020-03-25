import { RoutineType } from "./RoutineType";

/**
 * Stored procedures and stored functions
 */
export interface Routine {

    /**
     * Name
     */
    name: string;

    /**
     * Routine type
     */
    type: RoutineType;

    /**
     * Last execution date
     */
    alertedAt?: string;

    /**
     * Creation date
     */
    createdAt?: string;

    /**
     * Stored procedure or stored function body
     */
    body: string;

    /** 
     * DDL comment
     */
    comment: string;

    /**
     * If stored function, returned data type
     */
    returns?: string;
};
