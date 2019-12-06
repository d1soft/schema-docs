export type Trigger = {
    name: string;
    action: string; // update / delete / insert
    body: string;
    createdAt: string;
    collation?: string;
    sqlMode: string;
    timing: string; // before / after
    comment?: string;
    ddl?: string;
};
