import { HistoryDTO } from './HistoryDTO';
import { UserSolicitudeDTO } from './UserDTO';

export interface SolicitudeTableDTO {
  id: number;
  title: string;
  sender: UserSolicitudeDTO;
  receiver: UserSolicitudeDTO;
  initHistory: HistoryDTO;
  lastHistory: HistoryDTO;
}

export interface SolicitudeGetDTO {
  id: number;
  title: string;
  sender: UserSolicitudeDTO;
  receiver: UserSolicitudeDTO;
  histories: HistoryDTO[];
}
