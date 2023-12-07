interface IEventService {
  createEvent: (eventData: Event) => Promise<PrismaEvent>;
  getEvent: (id: number) => Promise<PrismaEvent>;
  updateEvent: (id: number, eventData: Event) => Promise<PrismaEvent>;
}

export class EventService implements IEventService {
  constructor(private eventRepository: IEventRepository) {}

  async createEvent(eventData: Event): Promise<PrismaEvent> {
    return await this.eventRepository.createEvent(eventData);
  }

  async getEvent(id: number): Promise<PrismaEvent> {
    return await this.eventRepository.getEvent(id);
  }

  async updateEvent(id: number, eventData: Event): Promise<PrismaEvent> {
    return await this.eventRepository.updateEvent(id, eventData);
  }
}
