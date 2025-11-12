import { UnauthorizedException } from '../CustomException';

export class SolicitudeNotFoundException extends UnauthorizedException {
  constructor() {
    super('Solicitud NO Registrada');
  }
}
