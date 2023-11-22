import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { TicketCreatedEvent } from './infraestructure/Interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @EventPattern('ticket_created')
  handleTicketCreated(data: TicketCreatedEvent) {
    this.appService.handleTicketCreated(data);
  }
}
