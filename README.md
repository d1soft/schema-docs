# SchemaDocs - database documentation generator

## Features

- Generates docs from many databases at once
- Supported adapters and specified things
    - [-] MySQL
        - [+] Tables
        - [+] Columns
        - [+] Triggers
        - [+] Events
        - [+] Foreign keys
        - [+] Indexes
        - [+] Stored functions and stored procedures
        - [-] Partitions
        - [-] Checks (MySQL >=8.0.16)
        - [-] Additional schema and tables info  
    - [-] PostgreSQL
    - [-] Microsoft SQL Server
    - [-] SQLite
        - [+] Tables
        - [-] Indexes
        - [-] Foreign keys
        - [-] Additional schema and tables info
    - [-] MongoDB
    
- Templates
    - Full schema objects info allowed at any template
    - HTML
        - Table of contents in sidebar with anchor links
        - Anchor links from foreign keys info 
    - Markdown
        - Simple full-featured table style
    - Confluence Storage Format
        - Rich macros using: code-blocks and spoilers for DDL
        - Table of contents with anchor links
    - Confluence Wiki Format 
        - Simple full-featured table style
    - JSON
        - Include full Schema object structure
- ERD
    - Converts Schema object to text schema with relationships
    - Generates beatify diagrams in png, jpg, pdf, svg and more formats

## Guide

Install:  
```schell
npm -g install schema-docs

yarn add global schema-docs
```

Usage:

```schell
schema-docs \ 
    --database mysql://user:password/localhost:3306/database \ 
    --templaters json,md,html \
    --ignore-tables _migrations,_hashes
    --output ./docs/db
    --erd  

schema-docs -c ./configs/schema-docs.json
```

## Configuration

You can pass configuration by two ways:
1. As CLI arguments (only one database at once)
2. As json file (any much databases at once)

### CLI arguments

| Option                | Description                                   | Default           | Example                           |
| --------------------- | --------------------------------------------- | ----------------- | --------------------------------- |
| --database, -d        | database connection string                    | -                 | `mysql://user@localhost/database` |
| --config, -c          | jSON-configuration file path                  | -                 | `./config/schema-docs.json`       |
| --templaters, -t      | comma-separated list of names used templaters | `json,html`       | `html,md`                         |
| --output, -o          | output documentation root directory           | `./schema-docs`   | `./documentation/db`              |
| --ignore-tables, -i   | comma-separated list with names to be ignored | ""                | `users_creditnals,admin_users`    |
| --erd, -e             | generate ER-diagram flag                      | `none`            | -                                 |

⚠️ **Required one of --database or --config option.**  

### JSON configuration file

Sample configuration file you can find at [config.example.json](./config.example.json)

Structure:

```js
{	
	//databases configuration
	"databases": [
        //simple connection with connection string
		{
			//connection name
            "name": "databaseOne",
			//connection string
            "connection": "mysql://connection",
			//generate ER-diagram
            "erd": true,
			//ignored tables list
            "ignoreTable": [
                "_migrations"
            ]
        },
		//build connection string from env-configuration
        {
            "name": "databaseTwo",
            //env file info
			"envConfig": {
				//path to env file
                "path": "/path/to/.env",
				//connection string template with vars from env config
                "connection": "mysq://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
            },
            "erd": true,
            "ignoreTable": [
                "_migrations"
            ]
        }, 
		//build connection string from json-configuration
        {
            "name": "databaseThree",
			//json file info
            "jsonConfig": {
				//path to json config
                "path": "path/to/config.json",
				//connection string template with vars from json (allowed nesting)
                "connection": "mysql://{database.user}:{database.password}"
            },
            "erd": true,
            "ignoreTable": [
                "_migrations"
            ]
        }
    ],
	//templaters configuration
	"templaters": [
		//simple templater name
		"json",
		//with overrided template
        {
            "html": {
                "template": "path/to/template"
            }
        },
		"md",
		"confluence-wiki",
		"confluence-store"
    ],
	//output documentation directory 
    "output": "/path/to/save"
}
```

## Related projects

- [MySQL Workbench Model Document Generation](https://github.com/letrunghieu/mysql-workbench-plugin-doc-generating)
    - Plugin for MySQL Workbench
    - Single output format (md)

- [MySQL Workbench HTML Document Generation](https://github.com/d1soft/mysql-workbench-html-doc-generator)
    - Plugin for MySQL Workbench
    - Single output format (html)
