import * as dotenv from 'dotenv';

dotenv.config();

export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    env: process.env.NODE_ENV || 'development',
  },
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dbname',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  grpc: {
    url: process.env.GRPC_URL || 'localhost:50051',
  },
});
