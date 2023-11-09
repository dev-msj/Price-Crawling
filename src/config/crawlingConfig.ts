import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  apiUrl: process.env.API_URL,
  secretKey: process.env.SECRET_KEY,
  batchName: process.env.BATCH_NAME,
}));
