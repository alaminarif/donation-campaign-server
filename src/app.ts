import express, { Application, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrodHandler from './app/middlewares/GlobalErrorHandler';
import routes from './app/routes/';
import notFound from './app/middlewares/notFound';
const app: Application = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use('/api/v1', routes);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('Unhandle Promise Rejection'));
// });

app.use(globalErrodHandler);

// handle api not fund
app.use(notFound);

export default app;
