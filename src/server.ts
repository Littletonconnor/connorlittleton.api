import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
import { protect } from './auth';
import { router } from './router';

import { signIn, signUp } from './user';

dotenv.config();

const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('static'));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use('/api', protect, router);

app.post('/signin', signIn);
app.post('/signup', signUp);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
