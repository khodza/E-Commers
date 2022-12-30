import express from 'express';
import userRouter from './routes/userRoute';
import { globalErrorHandler } from './handlers/errorHandler';
const app = express();

app.use('/api/v1/users', userRouter);

app.use(globalErrorHandler);

console.log('hello');
