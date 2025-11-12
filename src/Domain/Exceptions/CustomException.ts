import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}

/* SE MUESTRAN AL USUARIO, SIN ACCIÓN POSTERIOR */
export class GeneralException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

/* SE MUESTRAN AL USUARIO Y REDIRIGEN AL HOME */
export class UnauthorizedException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

/* SE MUESTRAN AL USUARIO Y REDIRIGEN AL LOGIN */
export class ForbiddenException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
