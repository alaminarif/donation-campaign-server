import express, {
  Application,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrodHandler from './app/middlewares/GlobalErrorHandler';
import routes from './app/routes/';
import httpStatus from 'http-status';
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
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});
export default app;
// 0W4O25Cb22yasv3c
