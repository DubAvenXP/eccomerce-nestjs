import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    database: {
      user: process.env.POSTGRES_DB_USER,
      host: process.env.POSTGRES_DB_HOST,
      pass: process.env.POSTGRES_DB_PASS,
      name: process.env.POSTGRES_DB_NAME,
      port: process.env.POSTGRES_DB_PORT,
    },
    email: {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      pass: process.env.EMAIL_PASS,
      user: process.env.EMAIL_USER,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  };
});
