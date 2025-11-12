import { Module } from '@nestjs/common';
import { PrismaUtil } from 'src/Infrastructure/Utils/prisma.util';
import { CryptUtil } from 'src/Infrastructure/Utils/crypt.util';
import { MapperUtil } from '../Utils/mapper.util';

@Module({
  providers: [PrismaUtil, CryptUtil, MapperUtil],
  exports: [PrismaUtil, CryptUtil, MapperUtil],
})
export class UtilModule {}
