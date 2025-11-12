import { SolicitudeTableDTO } from 'src/Domain/Entities/SolicitudeDTO';

export abstract class ISolicitudeRepository {
  abstract sentIndex(userId: string): Promise<SolicitudeTableDTO[]>;
  abstract receivedIndex(userId: string): Promise<SolicitudeTableDTO[]>;
}
