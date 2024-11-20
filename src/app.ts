import express, { Application, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrodHandler from './app/middlewares/GlobalErrorHandler';
import routes from './app/routes/';
import notFound from './app/middlewares/notFound';

const app: Application = express();

app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use('/api/v1', routes);

app.use(globalErrodHandler);

// handle api not fund
app.use(notFound);

export default app;
