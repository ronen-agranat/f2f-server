## Face-to-face server

> Have great conversations

A web app for taking notes, action items and follow-ups during 1-1 meetings.

### Features

- Plain-text note taking with keyboard shortcuts
- Simple so you can take notes faster
- Each conversation pulls up previous follow-up items
- Cross-reference action items in other peoples' one-on-ones
- Or assign action items to your own agenda
- Person switcher

### Technology

- React and TypeScript for front-end (`f2f` repo)
- NestJS and TypeScript for back-end and ORM (`f2f-server` repo)
- MySQL for data-store (old habits die hard; I'd rather to DB ops on a platform I'm very familiar with)

## Getting started

### Set up the data store

This application is tested with MySQL 5.7 and 8.0. **Note: Use legacy authentication mechanism for MySQL 8.0**

1. Create MySQL database, because it won't do this for you (convention)

        create database f2f

2. Create `ormconfig.json` file with MySQL database settings. This is an easy way to set your credentials privately. Be
sure not to check this file into source control. Sample file:

```
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "MYSQL_USERNAME",
  "password": "MYSQL_PASSWORD",
  "database": "f2f",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": false,
  "migrations": ["migration/*{.ts,.js}"],
  "cli": { "migrationsDir": "migration" }
}
```

3. Initialise the database by issuing the migrations so far:

       npx ts-node ./node_modules/typeorm/cli.js migration:run --config src/config/database.migration.config
        
4. Validate set-up by starting server and testing all looks well. Troubleshoot by inspecting DB with `mysql` CLI.

### Back-up datastore

You can issue the following to back-up the data-store using `mysql-dump`

        /bin/db-backup.sh MYSQL_USERNAME
        
This produces a mysqldump file in the *local directory*.

### Creating new migrations

A new migration should be made after every changes to `Entities`.
These are generated automatically for you with the following command:

        typeorm migration:generate -n MyMigration
        
Then build:

        npm run build
 
Then run as before:

        npx ts-node ./node_modules/typeorm/cli.js migration:run --config src/config/database.migration.config

### Restoring a back-up

The database back-ups are SQL files that can be edited directly to restore the database
structure itself, the contents or both.

Applying the backup directly will optionally recreate the structure and restore the data

First, create the database as above if it does not exist already.

    mysql> create database f2f

    $ cat f2f-backup.20200321T145927.sql | mysql -uroot -p f2f
    
Note that this will also capture the latest state of the migrations. The migrations can be
edited in the database directly in the `migrations` table.

## Troubleshooting

### mysql server won't start

> brew services restart mysql
> mysqld

So your mysql server is crashing. Follow the instructions here:
https://dev.mysql.com/doc/refman/5.7/en/forcing-innodb-recovery.html

You can create the options file in `~/.my.cnf`

You are likely to be able to recover all your data.

### How to reinstall mysql (OSX)

It can be uninstalled from System Preferences.
There is a pane called MySQL.
You can verify the current running status.
Then you can press 'Uninstall' to remove it completely.
It can then be reinstalled from binary package.
I suggest restarting between installing/uninstalling.

## AWS configuration

### RDS

**Low-cost dev / trial config**:

Amazon RDS

Standard create
Engine: MySQL
Version: MySQL 8.0.20
Templates: dev/test
DB instance identifier: f2f-database-1
Master username: admin
Master password: MySQL_PASSWORD
DB instance class: burstable classes, db.t3.micro
Storage type: magnetic
Allocated storage: 5 GiB
Multi-AZ: do not create standby instance
VPC: create new VPC
Subnet: Create new DB subnet group
Public access: yes
VPC security group: create new
New VPC security group name: f2f-vpc-security-group
Database authentication options: Password authentication
Initial database name: f2f
DB parameter group: default.mysql8.0
Option group: default:mysql-8-0
Backup: Enable automatic backup
Backup retention period: 7 days
Backup window: no preference
Encryption: disable encryption
Monitoring: disable enhanced monitoring
Enable auto minor version upgrade

Estimated monthly cost: 13.69 USD

Then add a security group inbound rule to allow access

You then can check mysql access with `mysql` command line tool.

Define the following environment variables:

F2F_DB_USERNAME=<username>
F2F_DB_PASSWORD=<password>
F2F_DB_HOSTNAME=<hostname>

## NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
