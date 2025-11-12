import { SolicitudeTableDTO } from 'src/Domain/Entities/SolicitudeDTO';

export abstract class ISolicitudeService {
  abstract sentIndex(userId: string): Promise<SolicitudeTableDTO[]>;
  abstract receivedIndex(userId: string): Promise<SolicitudeTableDTO[]>;
}
