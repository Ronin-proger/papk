import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  emit(name: string, payload?: unknown) {
    console.log(name, payload);
  }
}
