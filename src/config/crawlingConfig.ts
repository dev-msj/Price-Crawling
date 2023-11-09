import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  apiUrl: process.env.API_URL,
}));