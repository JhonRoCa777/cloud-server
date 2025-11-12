import { StateDTO } from './StateDTO';

export interface HistoryDTO {
  id: number;
  comment: string;
  state: StateDTO;
  created_at: string;
  viewed_at: string;
}
