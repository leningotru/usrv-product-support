import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { AppService } from './app.service';
import { TicketCreatedEvent } from './infraestructure/Interface';
import { StatusEnum } from './infraestructure/ValidationEnum';

jest.mock('axios');

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('handleTicketCreated', () => {
    it('should call axios.post with the correct data and return the response', async () => {
      const ticketCreatedEvent: TicketCreatedEvent = {
        id: "3f2a1078-e7e5-419e-a695-bfc607a1e979",
        state:23
      };

      const axiosPostSpy = jest.spyOn(axios, 'post');
      const expectedResponse = { data: 'mocked response' };

      axiosPostSpy.mockResolvedValue(expectedResponse);
      const result = await appService.handleTicketCreated(ticketCreatedEvent);
      expect(axiosPostSpy).toHaveBeenCalledWith(
        'http://localhost:4000/graphql',
        {
          query: expect.any(String),
          variables: {
            updateTicketInput: {
              id: ticketCreatedEvent.id,
              status: expect.any(String),
            },
          },
        },
      );
      expect(result).toEqual(expectedResponse.data);
    });

    it('should throw an error if axios.post fails', async () => {
      const ticketCreatedEvent: TicketCreatedEvent = {
        id: "3f2a1078-e7e5-419e-a695-bfc607a1e979",
        state:23
      };

      const axiosPostSpy = jest.spyOn(axios, 'post');
      const expectedError = new Error('Mocked axios error');
      axiosPostSpy.mockRejectedValue(expectedError);

      await expect(appService.handleTicketCreated(ticketCreatedEvent)).rejects.toThrowError(
        `Error fetching data: ${expectedError.message}`,
      );
    });
  });

  describe('getRandomStatus', () => {
    it('should return a valid status from StatusEnum', () => {
      const result = appService.getRandomStatus();

      expect(Object.values(StatusEnum)).toContain(result);
    });
  })

});
