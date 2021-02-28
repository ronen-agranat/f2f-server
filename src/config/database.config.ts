// https://github.com/tuna-date/Serverless-NestJS-MySQL-Swagger/blob/master/src/config/database.config.ts

import { pathToFileURL } from "url";

// Load .env file for appropriate environment (e.g. 'production', 'development', 'test')
// Needs to correspond to `.env` file in the project directory
var path = require('path');
const ENVIRONMENT = process.env.F2F_SERVER_ENVIRONMENT || 'development';
const DOT_ENV_FILE = path.resolve(process.cwd(), `.${ENVIRONMENT}.env`);
require('dotenv').config({
  path: DOT_ENV_FILE
});

export const DatabaseConfig = {
  // Loaded from .env file or environment variables using NestJS config
  type: (process.env.TYPEORM_CONNECTION || 'mysql') as any,
  driver: 'mysql',
  host: process.env.F2F_DB_HOSTNAME,
  port: parseInt(process.env.TYPEORM_PORT) || 3306,
  username: process.env.F2F_DB_USERNAME,
  password: process.env.F2F_DB_PASSWORD,
  database: process.env.TYPEORM_DATABASE || 'f2f',

  // Flags governing automatic creation of tables and running of migrations.
  // Convenient to have these on, but they are destructive
  synchronize: false,
  migrationsRun: false,

  // Need to specify paths and extensions for TypeScript support
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/**/*{.ts,.js}"],
  cli: { "migrationsDir": "src/migrations" }
}