import { 
    Column, 
    ForeignKey, 
    Index, 
    Trigger 
} from './index';

/**
 * Common table definition
 */
export interface Table {

    /**
     * Name
     */
    name: string;
    
    /**
     * Collation (charset)
     */
    collation?: string;

    /**
     * DDL comment
     */
    comment: string;

    /**
     * RDBM engine name (if exists)
     */
    engine?: string;

    /**
     * Creation date
     */
    createdAt?: string;

    /**
     * Columns list
     */
    columns?: Column[];
    
    /**
     * Indexes list
     */
    indexes?: Index[];

    /**
     * Foreign keys list
     */
    foreigns?: ForeignKey[];

    /**
     * Triggers list
     */
    triggers?: Trigger[];

    /**
     * DDL query
     */
    ddl?: string;
};
