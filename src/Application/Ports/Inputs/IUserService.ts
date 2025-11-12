import { InUserLoginDTO, OutUserLoginDTO } from 'src/Domain/Entities/UserDTO';

export abstract class IUserService {
  abstract getTokenByCredentials(
    inUserLoginDTO: InUserLoginDTO,
  ): Promise<OutUserLoginDTO>;
}
