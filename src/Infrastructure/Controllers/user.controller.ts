import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { UserLoginValidator } from 'src/Infrastructure/Validators/user.validator';
import { JwtService } from '@nestjs/jwt';
import { InUserLoginDTO } from 'src/Domain/Entities/UserDTO';
import { IUserService } from 'src/Application/Ports/Inputs/IUserService';
import { MapperUtil } from 'src/Infrastructure/Utils/mapper.util';
import { IsAuthFilter } from 'src/Infrastructure/Filters/IsAuth.filter';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: IUserService,
    private readonly jwtService: JwtService,
    private readonly mapper: MapperUtil,
  ) {}

  @Post('login')
  async login(
    @Body() UserLoginValidator: UserLoginValidator,
    @Res({ passthrough: true }) res: Response,
  ) {
    const dto = this.mapper.plainToInstance(InUserLoginDTO, UserLoginValidator);

    const { id } = await this.userService.getTokenByCredentials(dto);

    const token = this.jwtService.sign({ sub: id });

    res.cookie(process.env.COOKIE_NAME!, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600 * 1000 * Number(process.env.JWT_TIME),
    });

    return 'Bienvenido';
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(process.env.COOKIE_NAME!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return 'Vuelve Pronto';
  }

  @UseGuards(IsAuthFilter)
  @Get('verify')
  verify(@Req() req: Request) {
    return req[process.env.COOKIE_NAME!] as string;
  }
}
