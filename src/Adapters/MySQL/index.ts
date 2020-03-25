import { Connection, createConnection, QueryError } from 'mysql2';
import { MySQLColumn } from './Column';
import { MySQLForeignKey } from './ForeignKey';
import { MySQLIndex } from './Indexs';
import { MySQLRoutine } from './Routine';
import { MySQLTable } from './Table';
import { MySQLTrigger } from './Trigger';
import { TableDDL } from './TableDDL';
import { Variable } from './Variable';
import { ConfigDatabase } from '../../Configurator/ConfigDatabase';
import { Routine, Schema, Table, Event } from '../../Schema';
import { groupBy, semverCompare, dateFormatter, FormatterCallback} from '../../Utils';
import { MySQLEvent } from './Event';
import { EventDDL } from './EventDDL';
import { TriggerDDL } from './TriggerDDL';
import { IMySQLAdapter } from './IAdapter';
import { RoutineType } from '../../Schema/RoutineType';

/**
 * @class MySQLAdapter
 * @description MySQL schema info scrapper
 */
export class MySQLAdapter implements IMySQLAdapter {
    /**
     *
     */
    private connection?: Connection;
    private databaseName: string = '';
    private connectionName: string = '';
    private ignoreTables: string[] = [];

    private formate: FormatterCallback;

    private vars: Array<{
        name: string;
        description: string;
        value: string;
    }> = [];

    private readonly schemaVars: {
        [name: string]: string;
    } = {
        admin_port: 'Port',
        character_set_database: 'Charset',
        collation_database: 'Collation',
        connect_timeout: 'Connection timeout',
        time_zone: 'Timezone',
        version: 'MySQL version',
    };

    constructor() {
        this.formate = dateFormatter();
    }

    public async createConnection(config: ConfigDatabase): Promise<this> {
        this.connection = createConnection(config.connection);
        this.databaseName = config.databaseName;
        this.connectionName = config.connectionName;
        this.ignoreTables = config.ignoreTables;

        await this.getVars();

        return this;
    }

    public async closeConnection(): Promise<this> {
        if (this.connection) {
            this.connection.destroy();
        }

        return this;
    }

    /**
     * Gets database objects
     *
     * @returns {Promise<Schema>}
     */
    public async getSchema(): Promise<Schema> {
        let events;
        // let constraints;

        const tables = await this.getTables();
        const procedures = await this.getRoutines();

        const actions = [
            this.getColumns(tables),
            this.getTriggers(tables),
            this.getIndexes(tables),
            this.getForeigns(tables),
        ];

        /**
         * Events supported MySQL from 5.1.6
         */
        if (semverCompare('5.1.6', this.getVersion()) >= 0) {
            events = await this.getEvents();
        }

        /**
         * Check constraints supported MySQL from 8.0.16
         */
        if (semverCompare('8.0.16', this.getVersion()) >= 0) {
            // constraints = await this.getChecks();
        }

        await Promise.all(actions);

        return {
            connectionName: this.connectionName,
            databaseName: this.databaseName,
            events,
            procedures,
            tables,
            vars: this.vars,
        };
    }


    /**
     * Gets schema tables
     *
     * @returns {Promise<Table[]>}
     */
    public async getTables(): Promise<Table[]> {
        const tables = await this.query<MySQLTable[]>(
            `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${this.databaseName}';`
        );

        const tablesDDL = await Promise.all(
            tables.map(t => {
                return this.query<TableDDL[]>(
                    `SHOW CREATE TABLE \`${t.TABLE_NAME}\``
                );
            })
        );

        return tables
            .filter(t => !this.ignoreTables.includes(t.TABLE_NAME))
            .map((t: MySQLTable) => {
                const ddl = tablesDDL.find(x => x[0].Table === t.TABLE_NAME);

                return {
                    collation: t.TABLE_COLLATION,
                    comment: t.TABLE_COMMENT,
                    createdAt: this.formate(t.CREATE_TIME),
                    ddl: ddl ? ddl[0]['Create Table'] : '',
                    engine: t.ENGINE,
                    name: t.TABLE_NAME,
                };
            });
    }

    /**
     * Gets database events
     *
     * @returns {Promise<Event[]>}
     */
    public async getEvents(): Promise<Event[]> {
        const events = await this.query<MySQLEvent[]>(
            `SELECT * FROM INFORMATION_SCHEMA.EVENTS WHERE EVENT_SCHEMA = '${this.databaseName}';`
        );

        const eventsDDL = await Promise.all(
            events.map(e => {
                return this.query<EventDDL[]>(
                    `SHOW CREATE EVENT \`${e.EVENT_NAME}\``
                );
            })
        );

        return events.map((event: MySQLEvent) => {
            const ddl = eventsDDL.find(e => e[0].Event === event.EVENT_NAME);

            return {
                alteredAt: this.formate(event.LAST_ALTERED),
                body: event.EVENT_DEFINITION,
                collation: event.DATABASE_COLLATION,
                comment: event.EVENT_COMMENT,
                createdAt: this.formate(event.CREATED),
                ddl: ddl ? ddl[0]['Create Event'] : '',
                endsAt: event.ENDS ? this.formate(event.ENDS) : null,
                lastExecutedAt: event.LAST_EXECUTED ? this.formate(event.LAST_EXECUTED) : null,
                name: event.EVENT_NAME,
                onComplete: event.ON_COMPLETION,
                sqlMode: event.SQL_MODE,
                startsAt: event.STARTS ? this.formate(event.STARTS) : null,
                status: event.STATUS,
                type: event.EVENT_TYPE,
            };
        });
    }

    /**
     * Gets database columns by table
     *
     * @param {Table[]} tables Schema tables
     *
     * @returns {Promise<void>}
     */
    public async getColumns(tables: Table[]): Promise<void> {
        const columns = await this.query<MySQLColumn[]>(
            `SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${this.databaseName}';`
        );

        tables.map((t: Table) => {
            const tableColumns = columns.filter(c => c.TABLE_NAME === t.name)
                .sort((a, b) => a.ORDINAL_POSITION - b.ORDINAL_POSITION);

            if (tableColumns.length > 0) {
                t.columns = tableColumns.map((c: MySQLColumn) => {
                    return {
                        collation: c.COLLATION_NAME || t.collation,
                        comment: c.COLUMN_COMMENT,
                        default: c.COLUMN_DEFAULT || '',
                        extra: c.EXTRA || '',
                        name: c.COLUMN_NAME || '',
                        nullable: c.IS_NULLABLE === 'YES',
                        type: c.COLUMN_TYPE,
                    };
                });
            }
        });
    }

    /**
     * Gets database stored function and stored procedures
     *
     * @returns {Promise<Routine[]>}
     */
    public async getRoutines(): Promise<Routine[]> {
        const procedures = await this.query<MySQLRoutine[]>(`
            SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA = '${this.databaseName}';
        `);

        return procedures.map((p: MySQLRoutine) => {
            return {
                alertedAt: this.formate(p.LAST_ALTERED),
                body: p.ROUTINE_DEFINITION || '',
                comment: p.ROUTINE_COMMENT,
                createdAt: this.formate(p.CREATED),
                name: p.ROUTINE_NAME,
                returns: p.DTD_IDENTIFIER || undefined,
                type: p.ROUTINE_TYPE === 'FUNCTION' ? RoutineType.Function : RoutineType.Procedure,
            };
        });
    }

    /**
     * Gets database triggers
     *
     * @param {Table[]} tables Schema tables
     *
     * @returns {Promise<void>}
     */
    public async getTriggers(tables: Table[]): Promise<void> {
        const triggers = await this.query<MySQLTrigger[]>(`
            SELECT * FROM INFORMATION_SCHEMA.TRIGGERS WHERE TRIGGER_SCHEMA = '${this.databaseName}';
        `);

        const triggersDDL = await Promise.all(
            triggers.map(t => {
                return this.query<TriggerDDL[]>(
                    `SHOW CREATE TRIGGER \`${t.TRIGGER_NAME}\``
                );
            })
        );

        tables.map((table: Table) => {
            const tableTriggers = triggers.filter(
                tr => tr.EVENT_OBJECT_TABLE === table.name
            );

            if (tableTriggers.length > 0) {
                table.triggers = tableTriggers.map((c: MySQLTrigger) => {
                    const ddl = triggersDDL.find(t => t[0].Trigger === c.TRIGGER_NAME);

                    return {
                        action: c.EVENT_MANIPULATION,
                        body: c.ACTION_STATEMENT,
                        collation: c.DATABASE_COLLATION || table.collation,
                        createdAt: this.formate(c.CREATED),
                        ddl: ddl ? ddl[0]["SQL Original Statement"].trim() : '',
                        name: c.TRIGGER_NAME,
                        sqlMode: c.SQL_MODE,
                        timing: c.ACTION_TIMING,
                    };
                });
            }
        });
    }

    /**
     * Gets database foreign keys (constraints)
     *
     * @param {Table[]} tables Schema tables
     *
     * @returns {Promise<void>}
     */
    public async getForeigns(tables: Table[]): Promise<void> {
        const foreigns = await this.query<MySQLForeignKey[]>(
            `SELECT * FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_SCHEMA = '${this.databaseName}'`
        );

        tables.map((t: Table) => {
            const tableForeigns = foreigns.filter(
                frg =>
                    frg.TABLE_NAME === t.name ||
                    frg.REFERENCED_TABLE_NAME === t.name
            );

            if (tableForeigns.length > 0) {
                const composite = groupBy<MySQLForeignKey>(
                    'CONSTRAINT_NAME',
                    tableForeigns
                );

                t.foreigns = Object.values(composite).map(
                    (frg: MySQLForeignKey[]) => {
                        return {
                            columns: frg.map(f => f.COLUMN_NAME).join(', '),
                            columnsRef: frg
                                .map(f => f.REFERENCED_COLUMN_NAME)
                                .join(', '),
                            name: frg[0].CONSTRAINT_NAME,
                            table: frg[0].TABLE_NAME,
                            tableRef: frg[0].REFERENCED_TABLE_NAME,
                        };
                    }
                );
            }
        });
    }

    /**
     * Gets database indexes
     *
     * @param {Table[]} tables Schema tables
     *
     * @returns {Promise<void>}
     */
    public async getIndexes(tables: Table[]): Promise<void> {
        const indexes = await this.query<MySQLIndex[]>(
            `SELECT * FROM INFORMATION_SCHEMA.STATISTICS WHERE INDEX_SCHEMA = '${this.databaseName}'`
        );

        tables.map((t: Table) => {
            const tableIndexes = indexes.filter(
                idx => idx.TABLE_NAME === t.name
            );

            if (tableIndexes.length > 0) {
                const composite = groupBy<MySQLIndex>(
                    'INDEX_NAME',
                    tableIndexes
                );

                t.indexes = Object.values(composite).map(
                    (idxs: MySQLIndex[]) => {
                        return {
                            columns: idxs
                                .map(idx => idx.COLUMN_NAME)
                                .join(', '),
                            comment: idxs[0].INDEX_COMMENT,
                            name: idxs[0].INDEX_NAME,
                            nullable: idxs[0].NULLABLE === 'YES',
                            order:
                                idxs[0].COLLATION === null
                                    ? null
                                    : idxs[0].COLLATION === 'A'
                                    ? 'ASC'
                                    : 'DESC',
                            type: idxs[0].INDEX_TYPE,
                            uniqie: idxs[0].NON_UNIQUE === 0,
                            visible: idxs[0].IS_VISIBLE === 'YES',
                        };
                    }
                );
            }
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

            this.connection.query(sql, (err: QueryError, res: T) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    private async getVars(): Promise<void> {
        const whereIn = Object.keys(this.schemaVars).join('", "');
        const vars = await this.query<Array<Variable<string>>>(
            `SHOW VARIABLES WHERE Variable_name IN ("${whereIn}");`
        );

        this.vars = vars.map(v => ({
            description: this.schemaVars[v.Variable_name],
            name: v.Variable_name,
            value: v.Value,
        }));
    }

    private getVersion(): string {
        const version = this.vars.find(v => v.name === 'version');
        return version ? version.value : '';
    }
}
