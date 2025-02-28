import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, map } from 'rxjs';
import { I18nService } from '../i18n/i18n.service';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    constructor(private readonly i18n: I18nService) {}
  
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();
      const lang = request.headers['accept-language'] || 'en';
      this.i18n.setLanguage(lang);
  
      return next.handle().pipe(
        map(async (data) => {
          if (!data) {
            return {
              status: 'success',
              message: this.i18n.translate('success.operation_completed'),
            };
          }
          return data;
        }),
      );
    }
  }
  