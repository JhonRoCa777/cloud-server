import { Module } from '@nestjs/common';
import { UtilModule } from 'src/Infrastructure/Modules/util.module';
import { UserController } from 'src/Infrastructure/Controllers/user.controller';
import { IUserRepository } from 'src/Application/Ports/Outputs/IUserRepository';
import { UserRepository } from 'src/Infrastructure/Adapters/UserRepository';
import { IUserService } from 'src/Application/Ports/Inputs/IUserService';
import { UserService } from 'src/Application/Services/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UtilModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: Number(process.env.JWT_TIME) * 3600 },
    }),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: IUserService,
      useClass: UserService,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [IUserService],
})
export class UserModule {}
