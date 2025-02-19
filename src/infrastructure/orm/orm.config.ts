import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'dbname',
  schema: process.env.DB_SCHEMA || 'public',
  synchronize: false, // Set to false in production
  logging: true,
  entities: [path.join(__dirname, '../../domain/entities/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../../migration/*{.ts,.js}')],
  subscribers: [path.join(__dirname, '../../domain/events/*.event{.ts,.js}')],
};
