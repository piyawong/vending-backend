import { DataSource } from 'typeorm';
import { DetectionRecord } from './detectionRecord/detectionRecord.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'vending',
  synchronize: false,
  logging: true,
  entities: [DetectionRecord],
  migrations: ['src/migrations/*.ts'],
});
