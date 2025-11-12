import { Expose } from 'class-transformer';

export class InUserLoginDTO {
  @Expose()
  email: string;

  @Expose()
  password: string;
}

export class OutUserLoginDTO {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  email_verified_at?: string;
}

export interface UserSolicitudeDTO {
  id: string;
  names: string;
  last_names: string;
  document: string;
}
