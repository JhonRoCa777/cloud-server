import { Module } from '@nestjs/common';
import { UtilModule } from 'src/Infrastructure/Modules/util.module';
import { SolicitudeController } from 'src/Infrastructure/Controllers/solicitude.controller';
import { ISolicitudeRepository } from 'src/Application/Ports/Outputs/ISolicitudeRepository';
import { SolicitudeRepository } from 'src/Infrastructure/Adapters/SolicitudeRepository';
import { ISolicitudeService } from 'src/Application/Ports/Inputs/ISolicitudeService';
import { SolicitudeService } from 'src/Application/Services/solicitude.service';

@Module({
  imports: [UtilModule],
  controllers: [SolicitudeController],
  providers: [
    {
      provide: ISolicitudeService,
      useClass: SolicitudeService,
    },
    {
      provide: ISolicitudeRepository,
      useClass: SolicitudeRepository,
    },
  ],
  exports: [ISolicitudeService],
})
export class SolicitudeModule {}
