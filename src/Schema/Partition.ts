import { Subpartition } from "./Subpartition";

export interface Partition {
    name: string;
    rows: number;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    comment: string;
    subpartitions?: Subpartition[];
}