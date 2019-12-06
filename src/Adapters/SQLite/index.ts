import { Database, Statement } from 'sqlite3';
import { SQLiteColumn } from './Column';
import { SQLiteForeign } from './ForeignKey';
import { SQLiteIndex } from './Indexs';
import { SQLiteTable } from './Table';
import { Schema, Table } from '../../Schema';
import { groupBy } from '../../Utils';

export type AdapterConfig = {
    path: string;
};

export default class SQLiteAdapter {
    private readonly connection: Database;

    constructor() {
        this.connection = new Database('./chinook/chinook.db');
    }

    public async getSchema(): Promise<Schema> {
        const tables = await this.getTables();

        await Promise.all([
            this.getColumns(tables),
            this.getIndexes(tables),
            this.getForeigns(tables),
        ]);

        return {
            connectionName: '',
            databaseName: '',
            tables,
        };
    }

    public async getTables(): Promise<Table[]> {
        const tables = await this.query<SQLiteTable[]>(`
            SELECT * FROM sqlite_master WHERE type = "table"
        `);

        return tables.map(t => ({
            comment: '',
            name: t.tbl_name,
        }));
    }

    public async getColumns(tables: Table[]): Promise<void> {
        tables.map((table: Table) => {
            this.query<SQLiteColumn[]>(
                `PRAGMA TABLE_INFO(${table.name});`
            ).then((columns: SQLiteColumn[]) => {
                table.columns = columns.map(c => ({
                    default: c.dflt_value,
                    extra: c.pk === 0 ? 'PRIMARY' : '',
                    name: c.name,
                    nullable: c.notnull === 0,
                    type: c.type,
                }));
            });
        });
    }

    public async getIndexes(tables: Table[]): Promise<void> {
        tables.map((table: Table) => {
            this.query<SQLiteIndex[]>(`PRAGMA INDEX_LIST(${table.name})`).then(
                (indexes: SQLiteIndex[]) => {
                    // table.indexes = indexes.map((i: SQLiteIndex) => ({
                    //     name: i.name,
                    //     order: null,
                    //     uniqie: i.unique === 1
                    // }))
                }
            );
        });
    }

    public getViews() {
        this.connection.all(
            'SELECT * FROM sqlite_master WHERE type = "view"',
            (s: Statement, rows: [], err: Error) => {
                if (err) {
                    // console.log("Error:", err);
                }
                // console.log(rows);
            }
        );
    }

    public async getForeigns(tables: Table[]): Promise<void> {
        tables.map((table: Table) => {
            this.query<SQLiteForeign[]>(
                `PRAGMA FOREIGN_KEY_LIST(${table.name})`
            ).then((foreigns: SQLiteForeign[]) => {
                const composite = groupBy<SQLiteForeign>('name', foreigns);

                table.foreigns = Object.values(composite).map(
                    (foreign: SQLiteForeign[]) => ({
                        columns: foreign.map(f => f.from).join(', '),
                        columnsRef: foreign.map(f => f.to).join(', '),
                        name: foreign[0].name,
                        table: table.name,
                        tableRef: foreign[0].table,
                    })
                );
            });
        });
    }

    /**
     * Promisfy query
     *
     * @param {string} sql SQL query
     * @returns {Promise<T>}
     */
    private query<T>(sql: string): Promise<T> {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                return reject('Connection is not established');
            }

            this.connection.all(
                sql,
                (statement: Statement, rows: T, error: Error) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(rows);
                }
            );
        });
    }
}
