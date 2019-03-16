import * as createError from 'http-errors';
import * as logger from 'morgan';
import * as express from 'express';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
  next(createError(404));
});

// error handler
app.use((err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void => {
  if (err) {
    return res.status(err.status || 500).json(err);
  }
});

module.exports = app;
