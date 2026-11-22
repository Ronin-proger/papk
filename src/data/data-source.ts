import { DataSource } from 'typeorm';
import { AccessTokenEntity } from './access-token/access-token.entity';
import { UserData } from './user-data/user-data.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433', 10),
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'users_db',
  entities: [AccessTokenEntity, UserData],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
});
