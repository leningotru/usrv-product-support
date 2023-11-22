import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { requestUpdateTicket, TicketCreatedEvent, updateTicketInput } from './infraestructure/Interface';
import { StatusEnum } from './infraestructure/ValidationEnum';

const queryMutation: string = `
mutation($updateTicketInput: UpdateTicketInput!) {
  updateTicket(updateTicketInput: $updateTicketInput)
}
`;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async handleTicketCreated(ticketCreatedEvent: TicketCreatedEvent) {
    console.log("New Notification tu Update State", ticketCreatedEvent)

    const variables: updateTicketInput = {
      updateTicketInput: {
        id: ticketCreatedEvent.id,
        status: this.getRandomStatus(),
      },
    };
    const data: requestUpdateTicket = {
      query: queryMutation,
      variables
    }
    try {
      const response = await axios.post('http://localhost:4000/graphql', data);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }
  // Metodo creado debido a que se recibe como parametro un status de tipo Int, sin embargo la entidad solo recibe parametros de tipo STRING
  getRandomStatus(): StatusEnum {
    const statuses: StatusEnum[] = Object.values(StatusEnum);
    const randomIndex: number = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  }
}
