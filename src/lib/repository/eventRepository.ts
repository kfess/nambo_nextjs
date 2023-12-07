import { PrismaClient, Event as PrismaEvent } from "@prisma/client";
import { Event } from "@/lib/domain/event";

interface IEventRepository {
  createEvent: (eventData: Event) => Promise<PrismaEvent>;
  getEvent: (id: number) => Promise<PrismaEvent>;
  updateEvent: (id: number, eventData: Event) => Promise<PrismaEvent>;
}

export class EventRepository implements IEventRepository {
  constructor(private prisma: PrismaClient) {}

  async createEvent(eventData: Event): Promise<PrismaEvent> {
    return await this.prisma.event.create({
      data: {
        ...eventData,
        members: {
          create: eventData.members,
        },
      },
    });
  }

  async getEvent(id: number): Promise<PrismaEvent> {
    return await this.prisma.event.findUnique({ where: { id } });
  }

  async updateEvent(id: number, eventData: Event): Promise<PrismaEvent> {
    return await this.prisma.event.update({
      where: { id },
      data: {
        ...eventData,
        members: {
          create: eventData.members,
        },
      },
    });
  }
}
