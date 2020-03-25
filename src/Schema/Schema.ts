import { Routine, Table } from './index';
import { Event } from './Event';

/**
 * RDBM objects generic description
 */
export type Schema = {
    
    /**
     * Database name
     *
     * If RDBM not server-client type (MySQL, PostgreSQL),
     * but client type (SQLite, ...), this value is equal to file name
     */
    databaseName: string;

    /**
     * Connection name from config
     */
    connectionName: string;

    /**
     * Database specified useful vars
     */
    vars?: Array<{
        /**
         * Var name in RDBM
         */
        name: string;

        /**
         * Var description (used in docs)
         */
        description: string;

        /**
         * Var value
         */
        value: string;
    }>;

    /**
     * Database tables
     *
     * Supported: MySQL, SQLite
     */
    tables?: Table[];

    /**
     * Database stored procedures and stored functions
     *
     * Supported: MySQL
     */
    procedures?: Routine[];

    /**
     * Database events
     *
     * Supported: MySQL
     */
    events?: Event[];
};
