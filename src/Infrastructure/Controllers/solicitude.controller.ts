import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ISolicitudeService } from 'src/Application/Ports/Inputs/ISolicitudeService';
import { SolicitudeTableDTO } from 'src/Domain/Entities/SolicitudeDTO';
import { IsAuthFilter } from 'src/Infrastructure/Filters/IsAuth.filter';

@UseGuards(IsAuthFilter)
@Controller('solicitudes')
export class SolicitudeController {
  constructor(private readonly solicitudeService: ISolicitudeService) {}

  @Get('sent')
  async sentIndex(@Req() req: Request): Promise<SolicitudeTableDTO[]> {
    return this.solicitudeService.sentIndex(
      req[process.env.COOKIE_NAME!] as string,
    );
  }

  @Get('received')
  async receivedIndex(@Req() req: Request): Promise<SolicitudeTableDTO[]> {
    return this.solicitudeService.receivedIndex(
      req[process.env.COOKIE_NAME!] as string,
    );
  }
}
