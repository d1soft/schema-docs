export type SQLiteForeign = {
    /**
     * Parent table name
     */
    name: string;

    /**
     *
     */
    id: number;
    seq: number;

    /**
     * Child table name
     */
    table: string;

    /**
     * Parent table column name
     */
    from: string;

    /**
     * Child table column name
     */
    to: string;

    /**
     * Action on update
     */
    on_update:
        | 'RESTRICT'
        | 'NO ACTION'
        | 'SET NULL'
        | 'SET DEFAULT'
        | 'CASCADE';

    /**
     * Action on delete
     */
    on_delete:
        | 'RESTRICT'
        | 'NO ACTION'
        | 'SET NULL'
        | 'SET DEFAULT'
        | 'CASCADE';

    /**
     * SQL92 feature, not implemented
     */
    match: 'NONE';
};
