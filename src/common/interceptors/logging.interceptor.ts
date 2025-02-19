import { Injectable } from '@nestjs/common';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly excludedRoutes = [
    { path: '/health/liveness', method: 'GET' },
    { path: '/health/readiness', method: 'GET' },
  ];

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const isGrpcRequest = context.getType() === 'rpc';

    if (isGrpcRequest) {
      const grpcContext = context.switchToRpc();
      
      const args = grpcContext['args'];

      const logData = {
        eventtime: moment().toISOString(),
        tranid: 'N/A',
        reqtime: moment().toISOString(),
        source: 'N/A',
        system: 'N/A',
        service: 'nestjs-backend-template',
        method: grpcContext['contextType'] || 'N/A',
        loglvl: 'INFO',
        caller: args[2]?.path || 'N/A',
        msgdata: 'Request processed successfully',
      };

      console.log(JSON.stringify(logData));

      return next.handle().pipe(
        tap((data) => {
          logData.msgdata = `Response Data: ${JSON.stringify(data)}`;
          console.log(JSON.stringify(logData));
        }),
        catchError((error) => {
          const errorLogData = {
            ...logData,
            loglvl: 'ERROR',
            msgdata: `Error occurred: ${error.message}`,
          };

          console.error(JSON.stringify(errorLogData));

          return throwError(error);
        }),
      );
    }

    // Default behavior for HTTP requests
    const request = context.switchToHttp().getRequest();
    const { method, url, headers, body } = request;

    if (this.isExcluded(request)) {
      return next.handle();
    }

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
      msgdata: 'Request processed successfully',
    };

    console.log(JSON.stringify(logData));

    return next.handle().pipe(
      tap((data) => {
        logData.msgdata = `Response Data: ${JSON.stringify(data)}`;
        console.log(JSON.stringify(logData));
      }),
      catchError((error) => {
        const errorLogData = {
          ...logData,
          loglvl: 'ERROR',
          msgdata: `Error occurred: ${error.message}`,
        };

        console.error(JSON.stringify(errorLogData));

        return throwError(error);
      }),
    );
  }

  private isExcluded(req: any): boolean {
    return this.excludedRoutes.some(
      (route) =>
        route.path === req.url && route.method === req.method,
    );
  }
}
