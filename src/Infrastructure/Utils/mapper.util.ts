import { Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class MapperUtil {
  plainToInstanceArray<T, V>(cls: ClassConstructor<T>, plain: V[]): T[] {
    return plainToInstance(cls, plain, { excludeExtraneousValues: true });
  }
  plainToInstance<T, V>(cls: ClassConstructor<T>, plain: V): T {
    return plainToInstance(cls, plain, { excludeExtraneousValues: true });
  }
}
