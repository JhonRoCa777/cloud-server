import { ForbiddenException, GeneralException } from '../CustomException';

export class UserNotFoundException extends GeneralException {
  constructor() {
    super('Usuario NO Registrado');
  }
}

export class UserLoginNotFoundException extends GeneralException {
  constructor() {
    super('Credenciales Incorrectas');
  }
}

export class UserSesionNotFoundException extends ForbiddenException {
  constructor() {
    super('Sesion Finalizada');
  }
}
