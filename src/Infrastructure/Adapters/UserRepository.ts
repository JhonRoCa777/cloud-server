import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/Application/Ports/Outputs/IUserRepository';
import { InUserLoginDTO, OutUserLoginDTO } from 'src/Domain/Entities/UserDTO';
import {
  UserLoginNotFoundException,
  UserNotFoundException,
} from 'src/Domain/Exceptions/Types/UserException';
import { PrismaUtil } from 'src/Infrastructure/Utils/prisma.util';
import { CryptUtil } from 'src/Infrastructure/Utils/crypt.util';
import { MapperUtil } from 'src/Infrastructure/Utils/mapper.util';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly prisma: PrismaUtil,
    private readonly crypt: CryptUtil,
    private readonly mapper: MapperUtil,
  ) {}

  async getByCredentials(
    inUserLoginDTO: InUserLoginDTO,
  ): Promise<OutUserLoginDTO> {
    const user = await this.prisma.users.findUnique({
      where: { email: inUserLoginDTO.email },
      select: {
        id: true,
        email: true,
        email_verified_at: true,
        password: true,
      },
    });

    if (!user) throw new UserNotFoundException();

    if (!(await this.crypt.compare(inUserLoginDTO.password, user.password)))
      throw new UserLoginNotFoundException();

    return this.mapper.plainToInstance(OutUserLoginDTO, user);
  }
}
