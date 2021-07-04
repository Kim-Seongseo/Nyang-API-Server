import { ConnectionOptions } from 'typeorm';

const connectionOption: ConnectionOptions = {
  name: 'development',
  type: 'mysql',
  host: String(process.env.DB_HOST),
  port: parseInt(process.env.DB_PORT) || 3306,
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
};

export default connectionOption;
