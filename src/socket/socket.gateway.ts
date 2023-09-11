import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OpenAIService } from '../openai/openai.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Socket;
  constructor(private readonly openAIService: OpenAIService) {}
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
  @SubscribeMessage('chatMessage')
  async handleMessage(client: Socket, message: string) {
    console.log(`Received chat message from ${client.id}: ${message}`);
    try {
      const response = await this.openAIService.ask(message);
      console.log('Response from openAIService:', response);
      this.server.emit('chatMessage', { userId: client.id, message, response });
    } catch (error) {
      console.error('Error in openAIService.ask:', error);
    }
  }
}
