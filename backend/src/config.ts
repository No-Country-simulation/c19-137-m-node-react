import {registerAs} from '@nestjs/config';

export default registerAs('config', () => ({
    database: {
        name: process.env.DATABASE_NAME,
        port: process.env.PORT
    },
    postgres: {
        db_name: process.env.POSTGRES_DB,
        port: parseInt(process.env.POSTGRES_PORT, 10),
        password: process.env.POSTGRES_PASSWORD,
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST
    },
    apiKey: process.env.API_KEY
}));

