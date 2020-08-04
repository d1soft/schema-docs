import { Partition } from "./Partition";

export interface PartitionInfo {
    method: string;
    submethod: string;
    expression: string;
    subexpression: string;
    count: number;
    partitions?: Partition[];
}