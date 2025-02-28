import { Catch, ArgumentsHost, HttpStatus, HttpException, ExceptionFilter } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { I18nService } from '../i18n/i18n.service';
import { error } from 'console';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}
  
  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const lang = request.headers['accept-language'] || 'en'; // อ่านภาษา

    let statusCode = 500;
    let messageKey = 'error.server_error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const errorResponse = exception.getResponse();
      messageKey = (errorResponse as any).message || messageKey;
    }

    this.i18n.setLanguage(lang);
    const translatedMessage = await this.i18n.translate(messageKey);

    const env = process.env.NODE_ENV;
    if (env === 'development') {
      console.log(exception);
    }
    if (statusCode != 500) {
      return response.status(statusCode).json({
        error: {
          code: HttpStatus[statusCode],
          message: translatedMessage,
          stack: env === 'development' ? exception.stack : null,
        },
      });
    } else {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: translatedMessage,
          stack: env === 'development' ? exception.stack : null,
        },
      });
    }
  }
}
