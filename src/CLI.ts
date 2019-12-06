#!/usr/bin/env node

import commander from 'commander';
import signale from 'signale';
import { ConfigParser } from './Configurator/ConfigParser';
import { DocsGenerator } from './DocsGenerator';

function commaseparatedList(value: string) {
    return value.split(',');
}

type CLIParams = {
    database?: string;
    config?: string;
    templaters?: string[];
    output?: string;
    ignoreTables?: string[];
    erd?: boolean;
};

export function cli(args: any) {
    const program = commander
        .version('0.9.0')
        .description('Database schema documentation')
        .option('-d, --database <connection>', 'database connection string')
        .option('-c, --config <path>', 'config file path (schema-docs.json)')
        .option(
            '-t, --templaters <templaters>',
            'target templaters, comma-separated list of templaters names',
            commaseparatedList,
            ['json', 'html']
        )
        .option('-o, --output <path>', 'output files path', './schema-docs')
        .option(
            '-i, --ignore-tables <tables>',
            'ignore tables from database, comma-separated list',
            commaseparatedList,
            []
        )
        .option('-e, --erd', 'generate er-diagram', false)
        .action((params: CLIParams) => {
            if (!params.config && !params.database) {
                signale.fatal(
                    'Must be specified --config or --database option'
                );
                return process.exit(1);
            }
        })
        .parse(args);

    const configParser = new ConfigParser(program.config);
    const config = configParser.parse();
    if (!config) {
        signale.fatal(`Can't parse config. Exit...`);
        return process.exit(1);
    }

    const docsGenerator = new DocsGenerator(config);

    docsGenerator.generate().then(() => process.exit(0));
}

process.on('uncaughtException', (err) => {
    signale.error(err.message);
    process.exit(1);
});