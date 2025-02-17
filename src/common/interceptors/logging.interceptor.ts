import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  ExceptionFilter,
  Catch,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers, body } = request;

    const eventTime = moment().format('YYYY-MM-DD HH:mm:ss:SSS');

    const logData = {
      eventtime: eventTime,
      tranid: headers['transactionid'] || 'N/A',
      reqtime: moment().toISOString(),
      source: headers['source'] || 'WEB',
      system: headers['system'] || '00000',
      service: 'nestjs-backend-template',
      pathurl: url,
      method: method,
      loglvl: 'INFO',
      caller: `${request.originalUrl} ${method}`,
      msgdata: 'Request processed successfully', // Customize the message as needed
    };

    console.log(JSON.stringify(logData));

    return next.handle().pipe(
      tap((data) => {
        // Optionally log response data here, if necessary
        logData.msgdata = `Response Data: ${JSON.stringify(data)}`;
        console.log(JSON.stringify(logData));
      }),
      catchError((error) => {
        const errorLogData = {
          ...logData,
          loglvl: 'ERROR',
          msgdata: `Error occurred: ${error.message}`,
          // stack: error.stack,
        };

        console.error(JSON.stringify(errorLogData));

        return throwError(error);
      }),
    );
  }
}
