import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketCreatedEvent } from './infraestructure/Interface';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('handleTicketCreated', () => {
    it('should call appService.handleTicketCreated with the correct data', () => {
      const ticketCreatedEvent: TicketCreatedEvent = {
        id: '3',
        state: 404,
      };

      const handleTicketCreatedSpy = jest.spyOn(
        appService,
        'handleTicketCreated',
      );
      appController.handleTicketCreated(ticketCreatedEvent);
      expect(handleTicketCreatedSpy).toHaveBeenCalledWith(ticketCreatedEvent);
    });
  });
});
