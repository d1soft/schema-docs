# {{{tocItems.connectionName}}}
## Variables
| Name | Value |  
| :--- | :---- |  
| **Database name** | {{{tocItems.databaseName}}} |
{{#tocItems.vars}}
| {{{description}}} | {{{value}}} |
{{/tocItems.vars}}
## Table of content
{{#tocItems}}
{{#tables.length}}
- **Tables**  
{{#tables}}
    - {{{name}}} 
{{/tables}}
{{/tables.length}}
{{#procedures.length}}
- **Procedures**  
{{#procedures}}
    - {{{name}}} 
{{/procedures}}
{{/procedures.length}}
{{#events.length}}
- **Events**  
{{#events}}
    - {{{name}}} 
{{/events}}
{{/events.length}}
{{/tocItems}}
{{#tocItems}}
    {{#tables}}
### {{{name}}}  
{{{comment}}}  
|   |   |  
| :--- | :---- |  
{{#engine}}
| **Engine** | {{{engine}}} |  
{{/engine}}
{{#collation}}
| **Charset** | {{{collation}}} |  
{{/collation}}
{{#createdAt}}
| **Created at** | {{{createdAt}}} |  
{{/createdAt}}  
{{#ddl}}
```sql
{{{ddl}}}
``` 
{{/ddl}}
{{#columns.length}}
#### Columns  
| Name | Type | Modificators | Nullable | Default | Description |  
| :--- | :--- | :----------- | :------- | :------ | :---------- |  
{{/columns.length}}
{{#columns}}
| {{{name}}} | {{{type}}} | {{{extra}}} | {{{nullable}}} | {{{default}}} | {{{comment}}} |
{{/columns}}
{{#foreigns.length}}
#### Foreign keys  
| Name | Table | Columns | Referenced table | Referenced column |  
| :--- | :---- | :------ | :--------------- | :---------------- |  
{{/foreigns.length}}
{{#foreigns}}
| {{{name}}} | {{{table}}} | {{{columns}}} | {{{tableRef}}} | {{{columnsRef}}} |
{{/foreigns}}
{{#indexes.length}}
#### Indexes  
| Name | Columns | Type | Uniqie | Visible | Order | Nullable | Description |  
| :--- | :------ | :--- | :----- | :------ | :---- | :------- | :---------- |  
{{/indexes.length}}
{{#indexes}}
| {{{name}}} | {{{columns}}} | {{{type}}} | {{{uniqie}}} | {{{visible}}} | {{{order}}} | {{{nullable}}} | {{{comment}}} |
{{/indexes}}
{{#triggers.length}}
#### Triggers
{{#triggers}}
{{{name}}}
|      |      |  
| :--- | :--- |  
{{#action}}
| **Action** | {{{action}}} |  
{{/action}}
{{#timing}}
| **Timing** | {{{timing}}} |  
{{/timing}}
{{#collation}}
| **Charset** | {{{collation}}} |  
{{/collation}}
{{#createdAt}}
| **Created at** | {{{createdAt}}} |  
{{/createdAt}}
##### Body
{{#body}}
```sql
{{{body}}}
```
{{/body}}
{{/triggers}}
{{/triggers.length}}
{{/tables}}
{{#events}}
### {{{name}}}
{{{comment}}}
|      |      |  
| :--- | :--- |  
{{#collation}}
| **Charset** | {{{collation}}} |  
{{/collation}}
{{#createdAt}}
| **Created at** | {{{createdAt}}} |  
{{/createdAt}}
{{#alteredAt}}
| **Updated at** | {{{alteredAt}}} |  
{{/alteredAt}}
{{#lastExecutedAt}}
| **Last executed at** | {{{lastExecutedAt}}} |  
{{/lastExecutedAt}}
{{#startsAt}}
| **Starts at** | {{{startsAt}}} |  
{{/startsAt}}
{{#endsAt}}
| **Ends at** | {{{endsAt}}} |  
{{/endsAt}}
{{#executeAt}}
| **Execute at** | {{{executeAt}}} |  
{{/executeAt}}
{{#interval}}
| **Interval** | {{{interval}}} |  
{{/interval}}
{{#intervalValue}}
| **Interval value** | {{{intervalValue}}} |  
{{/intervalValue}}
{{#status}}
| **Status** | {{{status}}} |  
{{/status}}
{{#ddl}}
```sql
{{{ddl}}}
``` 
{{/ddl}}
#### Body
{{#body}}
```sql
{{{body}}}
``` 
{{/body}}
{{/events}}

{{#procedures}}
### {{{name}}}
{{{comment}}}  
|      |      |  
| :--- | :--- |  
{{#createdAt}} 
| **Created at** | {{{createdAt}}} |    
{{/createdAt}}
{{#returns}}
| **Returns** | {{{returns}}} |   
{{/returns}}
{{#alertedAt}}
| **Last executed at** | {{{alertedAt}}} |    
{{/alertedAt}}
#### Body
{{#body}}
```sql
{{{body}}}
``` 
{{/body}}
{{/procedures}}
{{/tocItems}}