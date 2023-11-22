export interface requestUpdateTicket {
  query: string;
  variables: updateTicketInput;
}

export interface updateTicketInput {
  updateTicketInput: {
    id: string;
    status: string;
  };
}

export interface TicketCreatedEvent {
  id: string,
  state: number,
}