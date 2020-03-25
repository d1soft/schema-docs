/**
 * Common trigger definition
 */
export interface Trigger {
    
    /**
     * Name
     */
    name: string;
    
    /**
     * Action type
     * 
     * Allowed: update, delete, insert
     */
    action: string; // update / delete / insert

    /**
     * Executed query
     */
    body: string;

    /**
     * Creation date
     */
    createdAt: string;

    /**
     * Collation
     */
    collation?: string;

    /**
     * Execution SQL-mode
     */
    sqlMode: string;

    /**
     * Execution timing
     * 
     * Allowed: before, after
     */
    timing: string;

    /**
     * Comment from DDL
     */
    comment?: string;

    /**
     * DDL query
     */
    ddl?: string;
};
