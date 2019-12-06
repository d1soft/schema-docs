import { Schema, Table } from "./Schema";
import { ConfigDatabase } from "./Configurator/ConfigDatabase";
import { writeFile } from "fs";
import signale = require("signale");
import { join } from "path";

type EntityProperty = {
    name: string;
    isPrimary: boolean;
    isForeign: boolean;
    label: string;
};

type ERDGeneratorConfig = {
    schema: Schema;
    connection: ConfigDatabase;
    path: string;
}

export class ERDGenerator {

    public build(config: ERDGeneratorConfig) {
        const { schema, connection, path } = config;

        if(!schema.tables) {
            return;
        }

        const tables = [];
        const foreigns = schema.tables
            .map(t => t.foreigns || [])
            .reduce((prev, next) => { 
                prev.push(...next);
                return prev; 
            }, []);

        for(const table of schema.tables) {
            const columns = this.getColumns(table)
                .sort(({ isPrimary: a }, { isPrimary: b}) => Number(b) - Number(a))
                .map(c => {
                    return `${c.isPrimary ? "*" : ""}${c.isForeign ? "+" : ""}${c.name} {label: "${c.label}"}`;
                });

            tables.push(`[${table.name}] {bgcolor: "#ececfc"}\n${columns.join('\n')}`);
        }

        const filtered = foreigns.filter((f, index, self) =>
            index === self.findIndex((t) => (
                t.table === f.table && t.columns === f.columns && t.tableRef === f.tableRef
            ))
        ).map(foreign => {
            return `${foreign.table} *--1 ${foreign.tableRef} {label: "${foreign.name}"}`;
        });

        const erdSchemaFile = tables.join('\n\n') + "\n\n" + filtered.join('\n');

        writeFile(join(path, 'erd.er') , erdSchemaFile, (err) => {
            if(err) {
                return signale.error(`Can't generate ERD diagram file for ${connection.connectionName}`);
            }
            
            signale.info(`ERD diagram file generated for "${connection.connectionName}"`);
        });
    }

    /**
     * Gets table primary index column names
     * 
     * @param {Table} table 
     * @returns {string}
     */
    private getPKs(table: Table): string[] {
        if(!table.indexes) {
            return []; 
        }

        return table.indexes
            .filter(i => i.name === 'PRIMARY')
            .map(i => i.columns.split(','))
            .reduce((prev, next) => { 
                prev.push(...next);
                return prev; 
            }, []);
    }

    /**
     * Gets foreign keys names from table
     * 
     * @param {Table} table 
     * @returns {string[] | undefined}
     */
    private getForeigns(table: Table) : string[] {
        if(!table.foreigns) {
            return [];
        }

        return table.foreigns
            .map(f => f.columns.split(','))
            .reduce((prev, next) => { 
                prev.push(...next);
                return prev; 
            }, []);
    }

    private getColumns(table: Table): EntityProperty[] {
        if(!table.columns) {
            return [];
        }

        const primaryKeys = this.getPKs(table);
        const foreigns = this.getForeigns(table);

        return table.columns.map(c => {
            const property = { 
                isForeign: false,
                isPrimary: false,
                label: `${c.type}${c.extra ? ', ' + c.extra : ''}${c.comment ? " - " + c.comment : ''}`,
                name: c.name,
            };

            if(primaryKeys.includes(c.name)) {
                property.isPrimary = true;
            }

            if(foreigns.includes(c.name)) {
                property.isForeign = true;
            }

            return property;
        });
    }
}