import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    apiKey: process.env.API_KEY,
    databaseUrl: process.env.DATABASE_URL,
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
