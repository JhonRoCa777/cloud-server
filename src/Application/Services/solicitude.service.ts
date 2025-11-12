import { Injectable } from '@nestjs/common';
import { SolicitudeTableDTO } from 'src/Domain/Entities/SolicitudeDTO';
import { ISolicitudeRepository } from 'src/Application/Ports/Outputs/ISolicitudeRepository';
import { ISolicitudeService } from 'src/Application/Ports/Inputs/ISolicitudeService';

@Injectable()
export class SolicitudeService implements ISolicitudeService {
  constructor(private readonly solicitudeRepository: ISolicitudeRepository) {}

  async sentIndex(userId: string): Promise<SolicitudeTableDTO[]> {
    return await this.solicitudeRepository.sentIndex(userId);
  }

  async receivedIndex(userId: string): Promise<SolicitudeTableDTO[]> {
    return await this.solicitudeRepository.receivedIndex(userId);
  }
}
