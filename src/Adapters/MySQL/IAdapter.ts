import { Table, Event, Routine } from "../../Schema";
import { IAdapter as ICommonAdapter } from '../IAdapter';

export interface IMySQLAdapter extends ICommonAdapter {
    getTables(): Promise<Table[]>;
    getEvents(): Promise<Event[]>;
    getRoutines(): Promise<Routine[]>;
    
    getColumns(tables: Table[]): Promise<void>;
    getTriggers(tables: Table[]): Promise<void>;
    getForeigns(tables: Table[]): Promise<void>;
    getIndexes(tables: Table[]): Promise<void>;
}