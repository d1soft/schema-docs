import { Table, Event, Routine } from "../../Schema";
import { Adapter as CommonAdapter } from '../Adapter';

export interface Adapter extends CommonAdapter {
    getTables(): Promise<Table[]>;
    getEvents(): Promise<Event[]>;
    getRoutines(): Promise<Routine[]>;
    
    getColumns(tables: Table[]): Promise<void>;
    getTriggers(tables: Table[]): Promise<void>;
    getForeigns(tables: Table[]): Promise<void>;
    getIndexes(tables: Table[]): Promise<void>;
}