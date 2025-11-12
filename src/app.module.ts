import { Module } from '@nestjs/common';
import { UtilModule } from 'src/Infrastructure/Modules/util.module';
import { SolicitudeModule } from 'src/Infrastructure/Modules/solicitude.module';
import { UserModule } from 'src/Infrastructure/Modules/user.module';

@Module({
  imports: [UtilModule, UserModule, SolicitudeModule],
})
export class AppModule {}
