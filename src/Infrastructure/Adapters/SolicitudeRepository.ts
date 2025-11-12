import { Injectable } from '@nestjs/common';
import { ISolicitudeRepository } from 'src/Application/Ports/Outputs/ISolicitudeRepository';
import { SolicitudeTableDTO } from 'src/Domain/Entities/SolicitudeDTO';
import { PrismaUtil } from 'src/Infrastructure/Utils/prisma.util';

@Injectable()
export class SolicitudeRepository implements ISolicitudeRepository {
  constructor(private readonly prisma: PrismaUtil) {}

  async sentIndex(userId: string): Promise<SolicitudeTableDTO[]> {
    const solicitudeList = await this.prisma.solicitudes.findMany({
      where: { sender_id: userId },
      select: {
        id: true,
        title: true,
        users_solicitudes_sender_idTousers: {
          select: { id: true, names: true, last_names: true, document: true },
        },
        users_solicitudes_receiver_idTousers: {
          select: { id: true, names: true, last_names: true, document: true },
        },
        histories: {
          orderBy: { created_at: 'asc' },
          select: {
            id: true,
            comment: true,
            created_at: true,
            viewed_at: true,
            states: { select: { id: true, name: true } },
          },
        },
      },
    });

    return solicitudeList.map((s) => ({
      id: s.id,
      title: s.title,
      sender: s.users_solicitudes_sender_idTousers,
      receiver: s.users_solicitudes_receiver_idTousers,
      initHistory: {
        id: s.histories[0]?.id,
        comment: s.histories[0]?.comment ?? '',
        created_at: s.histories[0]?.created_at?.toISOString() ?? '',
        viewed_at: s.histories[0]?.viewed_at?.toISOString() ?? '',
        state: {
          id: s.histories[0]?.states.id,
          name: s.histories[0]?.states.name,
        },
      },
      lastHistory: {
        id: s.histories[s.histories.length - 1]?.id,
        comment: s.histories[s.histories.length - 1]?.comment ?? '',
        created_at:
          s.histories[s.histories.length - 1]?.created_at?.toISOString() ?? '',
        viewed_at:
          s.histories[s.histories.length - 1]?.viewed_at?.toISOString() ?? '',
        state: {
          id: s.histories[s.histories.length - 1]?.states.id,
          name: s.histories[s.histories.length - 1]?.states.name,
        },
      },
    }));
  }

  async receivedIndex(userId: string): Promise<SolicitudeTableDTO[]> {
    const solicitudeList = await this.prisma.solicitudes.findMany({
      where: { receiver_id: userId },
      select: {
        id: true,
        title: true,
        users_solicitudes_sender_idTousers: {
          select: { id: true, names: true, last_names: true, document: true },
        },
        users_solicitudes_receiver_idTousers: {
          select: { id: true, names: true, last_names: true, document: true },
        },
        histories: {
          orderBy: { created_at: 'asc' },
          select: {
            id: true,
            comment: true,
            created_at: true,
            viewed_at: true,
            states: { select: { id: true, name: true } },
          },
        },
      },
    });

    return solicitudeList.map((s) => ({
      id: s.id,
      title: s.title,
      sender: s.users_solicitudes_sender_idTousers,
      receiver: s.users_solicitudes_receiver_idTousers,
      initHistory: {
        id: s.histories[0]?.id,
        comment: s.histories[0]?.comment ?? '',
        created_at: s.histories[0]?.created_at?.toISOString() ?? '',
        viewed_at: s.histories[0]?.viewed_at?.toISOString() ?? '',
        state: {
          id: s.histories[0]?.states.id,
          name: s.histories[0]?.states.name,
        },
      },
      lastHistory: {
        id: s.histories[s.histories.length - 1]?.id,
        comment: s.histories[s.histories.length - 1]?.comment ?? '',
        created_at:
          s.histories[s.histories.length - 1]?.created_at?.toISOString() ?? '',
        viewed_at:
          s.histories[s.histories.length - 1]?.viewed_at?.toISOString() ?? '',
        state: {
          id: s.histories[s.histories.length - 1]?.states.id,
          name: s.histories[s.histories.length - 1]?.states.name,
        },
      },
    }));
  }
}
