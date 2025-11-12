import { InUserLoginDTO, OutUserLoginDTO } from 'src/Domain/Entities/UserDTO';

export abstract class IUserRepository {
  abstract getByCredentials(
    inUserLoginDTO: InUserLoginDTO,
  ): Promise<OutUserLoginDTO>;
}
