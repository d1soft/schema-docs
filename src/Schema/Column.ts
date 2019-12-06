/**
 * Generic Column description
 */
export type Column = {
    /**
     * Data type
     */
    type: string;

    /**
     * Column name
     */
    name: string;

    /**
     * Column collation (if supported by RDBM)
     *
     * Supported: MySQL
     */
    collation?: string;

    /**
     * Column comment (if supported by RDBM)
     *
     * Supported: MySQL
     */
    comment?: string;

    /**
     * Column attributes
     */
    extra?: string;

    /**
     * Column can be null
     */
    nullable: boolean;

    /**
     * Default value for column
     */
    default: string | number | null;
};
