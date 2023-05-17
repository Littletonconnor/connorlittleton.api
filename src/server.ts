import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { logger } from './lib/logger';
import { router } from './router';

dotenv.config();

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(port, () => {
  logger.success(`Example app listening at http://localhost:${port}`);
});
