import { registerAs } from '@nestjs/config';
import { User } from '../entities/user';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'GoodDeeds',
  entities: [User],
  synchronize: false,
  migrations: ['src/migration/*.ts'],
  migrationsTableName: 'migrations',
};

export default registerAs('db_config', () => config);
export const dataSource = new DataSource(config as DataSourceOptions);
