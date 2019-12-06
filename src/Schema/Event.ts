export type Event = {
    alteredAt: string;
    body: string;
    collation: string;
    comment: string;
    createdAt: string;
    ddl?: string;
    endsAt?: string | null;
    executeAt?: string | null;
    interval?: string | null;
    intervalValue?: number | null;
    lastExecutedAt: string | null;
    name: string;
    onComplete: string;
    sqlMode: string;
    startsAt?: string | null;
    status: string;
    type: string;
};
