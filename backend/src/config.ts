import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  db: {
    name: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10),
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    url: process.env.DATABASE_URL,
  },
  mail: {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
  },
}));
