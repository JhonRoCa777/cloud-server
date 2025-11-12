import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserSesionNotFoundException } from 'src/Domain/Exceptions/Types/UserException';

interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class IsAuthFilter implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.[process.env.COOKIE_NAME!] as string;

    if (!token) throw new UserSesionNotFoundException();

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token);
      request[process.env.COOKIE_NAME!] = payload.sub;
      return true;
    } catch (error) {
      console.log(error);
      throw new UserSesionNotFoundException();
    }
  }
}
