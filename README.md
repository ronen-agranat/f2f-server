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

### Install node

https://nodejs.org/en/download/

### Install nest CLI

        npm install -g @nestjs/cli

### Install MySQL

https://dev.mysql.com/downloads/mysql/

Add MySQL bin directory to path.

This application is tested with MySQL 5.7 and 8.0. **Note: Use legacy authentication mechanism for MySQL 8.0**

### Create database

Create MySQL database

        $ mysql -uroot -p
        mysql> create database f2f;

### Set up local environment

Create file in project root called `.dev.env` and set environment variables for DB, e.g.:

        TYPEORM_USERNAME=root
        TYPEORM_PASSWORD=<db_password>
        TYPEORM_HOST=localhost
        JWT_SECRET=<secret_for_passport_jwt>

### Create DB schema

        nest build

        npx ts-node ./node_modules/typeorm/cli.js migration:run --config src/config/database.config

### Start server

        nest start

### Create user

Can be done through UI. Alternatively, issue:

        POST /users/

With body like:

```
{
    "username": "ronen",
    "password": "helloworld",
    "name": "Ronen Agranat",
    "email": "ronen@example.com"
}
```

*See Postman collection*

### Log in user

Can be done through UI. Alternatively, issue:

        POST /auth/login

With body like:

```
{
        "username": "ronen",
        "password": "helloworld"
}
```

*See Postman collection*

This returns `access_token`, to be included in future requests as a header like:

        Authorization: Bearer 123456789abcdef...

### Set user as admin user

Must be done directly through DB

        mysql> UPDATE user SET isAdmin = 1 WHERE id = 1;

### Creating new migrations

A new migration should be made after every changes to `Entities`;
for example, after creating a new `Entity`.
These are generated automatically for you with the following command:

Build entities:

        nest build

Generate migration:

        npx ts-node ./node_modules/typeorm/cli.js migration:generate --config src/config/database.config -n MyMigration
 
Build migration:

        nest build

Run migration:

        npx ts-node ./node_modules/typeorm/cli.js migration:run --config src/config/database.config

### Authentication

Postman is used to provide authentication and is well-documented in the NestJS docs.

User accounts are stored in the `users` table and entity
which are governed by the `Users` controller, module and service.
Hashed passwords are stored and compared using `bcrypt`.
This is governed by the `auth` service.

Create a user:

    POST user

Authenticate a user:

    POST auth/login

Examples are available in the Postman collection.

On successful authentication, a JSON Web Token is issued (JWT), also known as a 'bearer token',
which the bearer then provides in the header of future requests. This can be seen in requesting
the `/profile` page, where the bearer token must be provided in order to access the user profile.
This is also illustrated in the Postman collection.

Note that these bearer tokens expire; the expiry time can be adjusted.

Note: Never store plaintext passwords. Never share password hashes.

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

Services is hosted as follows:

Cloud provider: AWS

RDS for database (MySQL)
Lambda for serverless hosting
CloudFormation for deployment and managing cloud resources
S3 for object storage

### RDS

**Low-cost dev / trial config**:

Amazon RDS

- Standard create
- Engine: MySQL
- Version: MySQL 8.0.20
- Templates: dev/test
- DB instance identifier: f2f-database-1
- Master username: admin
- Master password: MySQL_PASSWORD
- DB instance class: burstable classes, db.t3.micro
- Storage type: magnetic
- Allocated storage: 5 GiB
- Multi-AZ: do not create standby instance
- VPC: create new VPC
- Subnet: Create new DB subnet group
- Public access: yes
- VPC security group: create new
- New VPC security group name: f2f-vpc-security-group
- Database authentication options: Password authentication
- Initial database name: f2f
- DB parameter group: default.mysql8.0
- Option group: default:mysql-8-0
- Backup: Enable automatic backup
- Backup retention period: 7 days
- Backup window: no preference
- Encryption: disable encryption
- Monitoring: disable enhanced monitoring
- Enable auto minor version upgrade

Estimated monthly cost: 13.69 USD

Then add a security group inbound rule to allow access

You then can check mysql access with `mysql` command line tool.

#### Use native MySQL 8.0 authentication

MySQL 8.0 introduces a new authentication scheme called 'caching_sha2_password'.
Unfortunately, it is not supported by NodeJS.

This results in an error like:

        Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

Switch back to MySQL native password scheme as follows:

        ALTER USER admin IDENTIFIED WITH mysql_native_password BY 'plaintext_password';

#### Define environments and environment variables

* Create the following files in the project root directory:

        .dev.env
        .prod.env

And so forth

Define the following environment variables:

        TYPEORM_USERNAME=<username>
        TYPEORM_PASSWORD=<password>
        TYPEORM_HOST=<hostname>
        JWT_SECRET=<secret_for_passport_jwt>

This enables you to specify different environments; e.g. development, test, production.

This is powered using `dotenv`.

The environment to use is specified via the `NODE_ENV` which is itself an environment variable, which you can specify as part of the incantation when starting the application as follows:

        NODE_ENV=prod nest start

This works for running the application as well as for running migrations, with a single, simple config.

**The default environment is `dev`**.

**Note**: `dotenv` will favour actual environment variables over these values specified in the config file.
So if a variable appears not be updated, ensure it's not being set in the shell environment e.g. `$ unset  VAR`

### Run migrations against production DB

        NODE_ENV=prod npx ts-node ./node_modules/typeorm/cli.js migration:run --config src/config/database.config

### AWS Lambda and CloudFormation

As per guide: https://keyholesoftware.com/2019/05/13/aws-lambda-with-nestjs/

`nest-lambda.yaml` contains the CloudFormation template
`src/lambda-entry-point.ts` creates the application for the Lambda serverless deployment.

#### Ensure AWS CLI is installed

You will then have the `aws` command line utility

Create IAM user in AWS IAM console.
Retrieve access key and secret key.
Create `.aws` file in project root containing access key and secret key.

```
[default]
aws_access_key_id = ...
aws_secret_access_key = ...
```

#### Make bucket for CloudFormation materials

Bucket names must be unique over all of S3.

        aws s3 mb s3://ronen-agranat-f2f-test
        aws s3api put-bucket-lifecycle --bucket s3://ronen-agranat-f2f-test --lifecycle-configuration '{"Rules":[{"Expiration":{"Days":1},"Status":"Enabled","ID":"Delete1DayOld","Prefix":""}]}'

#### Create distribution bundle and deploy

Run the following script to deploy:

        ./bin/deploy.sh

Which does the following:

        mkdir deploy # Only needed once

        npm install # Only needed if packages change
        nest build
        npm prune --production

        # Important: Should show 0 vulnerabilities!

        # Test all is well
        nest start
        # ctrl-c

        # Remove old distributable if exists
        rm deploy/nest-lambda.zip
        # Create the distributable
        zip -r deploy/nest-lambda.zip dist/ node_modules

        aws cloudformation package --template-file nest-lambda.yaml --s3-bucket ronen-agranat-f2f-test --output-template-file deploy/nest-lambda.out.yaml

        aws cloudformation deploy --template-file deploy/nest-lambda.out.yaml --stack-name nest-lambda --capabilities CAPABILITY_IAM

#### Inspect in AWS console

https://console.aws.amazon.com

Creation of stack and events can be seen in AWS CloudFormation console.

The lambda function which was created can be seen in the AWS Lambda console.

The appropriate API and methods will appear in the AWS Gateway console.
It appears as {proxy+} due to the configuration being used here.

#### Set database environment variables

* Navigate to AWS Lambda console
* Functions -> nest-lambda-LambdaNestJSFunction-ABCD1234 -> Configuration
* Environment variables -> Add environment variables
* Add database variables as per DB config above:
        * F2F_DB_HOSTNAME
        * F2F_DB_PASSWORD
        * F2F_DB_USERNAME
* *These settings will be retained even after applying further CloudFormation updates*

#### CORS support

CORS is enabled through the following line in `src/lambda-entry-point.ts`:

    // Enable CORS
    nestApp.enableCors();

Note that CORS is specifically *not* enabled through the AWS Gateway console, and attempting to enable through AWS Gateway (Action -> Enable CORS) will result in an error. This is due to the configuration being used here.

#### Issue request to server

In AWS Lambda console, navigate to Lambda -> Applications -> nest-lambda -> API endpoint
This is the endpoint for the serverless Lambda application.

Convention is then to indicate the stage e.g. `Prod` for production.

Sample endpoint:
`https://dghyd9lb0d.execute-api.eu-west-1.amazonaws.com/Prod`

Sample URL:
`https://dghyd9lb0d.execute-api.eu-west-1.amazonaws.com/Prod/persons`
To show the persons; this can simply be `curl`ed or opened in the browser.
Alternatively, you can use HTTPie as the recommended HTTP CLI client.

#### Issue requests with Postman

You can also use a UI to issue requests against the endpoint.
A collection of sample requests is included in the project in the `/postman` dir.
These can be imported to Postman.
Then update the relevant URLs to reflect the endpoint as above.

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

# alternatively:
$ nest start

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

## Updating

#### Update Node to latest stable version

    sudo npm install n -g
    sudo n stable

#### Update npm to latest stable version

    sudo npm install -g npm

#### Update NestJS project dependencies to latest version

The offical instruction is:

        nest update

or

        nest update -f

However, these didn't work for me; had to update the following packages in package.json manually:

        "@nestjs/common": "^7.5.6",
        "@nestjs/core": "^7.5.6",
        "@nestjs/platform-express": "^7.5.6",
        "@nestjs/typeorm": "^7.1.5",

Tips: commit as soon as you reach working state; don't be shy to clean if things get into a weird state and checkout last working `package.json`. Be sure to test application in dev and production modes to confirm working state.

#### How to clean

    rm -rf node_modules
    rm package-lock.json
    npm install