# SchemaDocs MySQL example
## Variables
| Name | Value |  
| :--- | :---- |  
| **Database name** | schema_docs_mysql_example |
| Port | 33062 |
| Charset | utf8mb4 |
| Collation | utf8mb4_0900_ai_ci |
| Connection timeout | 10 |
| Timezone | SYSTEM |
| MySQL version | 8.0.18 |
## Table of content
- **Tables**  
    - countries 
    - statistic 
    - users 
- **Procedures**  
    - update_statistic 
### countries  
Countries info  
|   |   |  
| :--- | :---- |  
| **Engine** | InnoDB |  
| **Charset** | utf8mb4_0900_ai_ci |  
| **Created at** | 21.12.2019 23:03:01.000 |  
```sql
CREATE TABLE `countries` (
  `id` tinyint(1) NOT NULL COMMENT 'Country identificator',
  `name` varchar(255) DEFAULT NULL COMMENT 'Country full name',
  `flag_icon` varchar(255) DEFAULT NULL COMMENT 'Country icon url',
  `code` varchar(3) NOT NULL COMMENT 'ISO-code 3-letters',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Countries info'
``` 
#### Columns  
| Name | Type | Modificators | Nullable | Default | Description |  
| :--- | :--- | :----------- | :------- | :------ | :---------- |  
| id | tinyint(1) |  | false |  | Country identificator |
| name | varchar(255) |  | true |  | Country full name |
| flag_icon | varchar(255) |  | true |  | Country icon url |
| code | varchar(3) |  | false |  | ISO-code 3-letters |
#### Foreign keys  
| Name | Table | Columns | Referenced table | Referenced column |  
| :--- | :---- | :------ | :--------------- | :---------------- |  
| user_country | users | country_id | countries | id |
#### Indexes  
| Name | Columns | Type | Uniqie | Visible | Order | Nullable | Description |  
| :--- | :------ | :--- | :----- | :------ | :---- | :------- | :---------- |  
| code_UNIQUE | code | BTREE | true | true | ASC | false |  |
| id_UNIQUE | id | BTREE | true | true | ASC | false |  |
| PRIMARY | id | BTREE | true | true | ASC | false |  |
### statistic  
Statistic metrics values  
|   |   |  
| :--- | :---- |  
| **Engine** | InnoDB |  
| **Charset** | utf8mb4_0900_ai_ci |  
| **Created at** | 21.12.2019 23:06:16.000 |  
```sql
CREATE TABLE `statistic` (
  `date` date NOT NULL COMMENT 'Date of stats',
  `registered_users` int(10) DEFAULT '0' COMMENT 'Total users registered count',
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Statistic metrics values'
``` 
#### Columns  
| Name | Type | Modificators | Nullable | Default | Description |  
| :--- | :--- | :----------- | :------- | :------ | :---------- |  
| date | date |  | false |  | Date of stats |
| registered_users | int(10) |  | true | 0 | Total users registered count |
#### Indexes  
| Name | Columns | Type | Uniqie | Visible | Order | Nullable | Description |  
| :--- | :------ | :--- | :----- | :------ | :---- | :------- | :---------- |  
| PRIMARY | date | BTREE | true | true | ASC | false |  |
### users  
Users info  
|   |   |  
| :--- | :---- |  
| **Engine** | InnoDB |  
| **Charset** | utf8mb4_0900_ai_ci |  
| **Created at** | 21.12.2019 23:04:12.000 |  
```sql
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL COMMENT 'User email adress (unique)',
  `phone` varchar(255) DEFAULT NULL COMMENT 'User phone number (unique)',
  `country_id` tinyint(1) DEFAULT NULL COMMENT 'Country identificator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  KEY `user_country_idx` (`country_id`),
  CONSTRAINT `user_country` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Users info'
``` 
#### Columns  
| Name | Type | Modificators | Nullable | Default | Description |  
| :--- | :--- | :----------- | :------- | :------ | :---------- |  
| id | int(11) | auto_increment | false |  |  |
| email | varchar(255) |  | false |  | User email adress (unique) |
| phone | varchar(255) |  | true |  | User phone number (unique) |
| country_id | tinyint(1) |  | true |  | Country identificator |
#### Foreign keys  
| Name | Table | Columns | Referenced table | Referenced column |  
| :--- | :---- | :------ | :--------------- | :---------------- |  
| user_country | users | country_id | countries | id |
#### Indexes  
| Name | Columns | Type | Uniqie | Visible | Order | Nullable | Description |  
| :--- | :------ | :--- | :----- | :------ | :---- | :------- | :---------- |  
| email_UNIQUE | email | BTREE | true | true | ASC | false |  |
| id_UNIQUE | id | BTREE | true | true | ASC | false |  |
| phone_UNIQUE | phone | BTREE | true | true | ASC | true |  |
| PRIMARY | id | BTREE | true | true | ASC | false |  |
| user_country_idx | country_id | BTREE | false | true | ASC | true |  |

### update_statistic
  
|      |      |  
| :--- | :--- |  
| **Created at** | 21.12.2019 23:13:22.000 |    
| **Last executed at** | 21.12.2019 23:13:22.000 |    
#### Body
```sql
BEGIN
	SET @users_count := (SELECT COUNT(*) FROM `users`);
	INSERT INTO `statistic` (`date`, `registered_users`) VALUES (DATE(NOW()), @users_count);
END
``` 
