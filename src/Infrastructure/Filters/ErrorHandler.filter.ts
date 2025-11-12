import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomException } from 'src/Domain/Exceptions/CustomException';

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof CustomException)
      response.status(exception.getStatus()).send(exception.getResponse());

    if (exception instanceof BadRequestException) {
      const res = exception.getResponse();
      const message =
        typeof res === 'object' && 'message' in res
          ? res.message
          : 'Validation failed';
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(message);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Error');
      console.error(exception);
    }
  }
}
