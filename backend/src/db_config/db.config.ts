import { registerAs } from '@nestjs/config';
import { User } from '../entities/db_entities/user';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
} from '../constants/db.properties';
import { GoodDeed } from '../entities/db_entities/good.deed';

const config = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  entities: [User, GoodDeed],
  synchronize: false,
  migrations: ['dist/migration/*.js'],
  migrationsTableName: 'migrations',
};

export default registerAs('db_config', () => config);
export const dataSource = new DataSource(config as DataSourceOptions);
