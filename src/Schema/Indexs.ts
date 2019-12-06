export type Index = {
    name: string;
    columns: string;
    type: 'BTREE' | 'FULLTEXT' | 'HASH' | 'RTREE';
    order: 'ASC' | 'DESC' | null;
    nullable: boolean;
    uniqie: boolean;
    visible: boolean;
    comment?: string;
};
