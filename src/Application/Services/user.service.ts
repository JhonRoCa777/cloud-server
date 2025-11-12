import { Injectable } from '@nestjs/common';
import { InUserLoginDTO, OutUserLoginDTO } from 'src/Domain/Entities/UserDTO';
import { IUserRepository } from 'src/Application/Ports/Outputs/IUserRepository';
import { IUserService } from 'src/Application/Ports/Inputs/IUserService';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getTokenByCredentials(
    inUserLoginDTO: InUserLoginDTO,
  ): Promise<OutUserLoginDTO> {
    return await this.userRepository.getByCredentials(inUserLoginDTO);
  }
}
