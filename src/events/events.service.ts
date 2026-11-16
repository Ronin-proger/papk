import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  emit(name: string, payload?: any) {
    console.log(name, payload);
  }
}
