import { Inject, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OpenAIService } from '../openai/openai.service';
import { ChatService } from '../chat/chat.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Socket;
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
  @SubscribeMessage('chatMessage')
  async handleMessage(
    client: Socket,
    body: { chatId: number; userId: number; message: string },
  ) {
    console.log(`Received chat message from ${client.id}: ${body.message}`);
    try {
      const response = await this.openAIService.ask(body.message);
      const { message, userId, chatId } = body;
      await this.chatService.saveChat(chatId, userId, {
        userId: client.id,
        message,
        response,
      });
      // console.log('Response from openAIService:', response);
      this.server.emit('chatMessage', { userId: client.id, message, response });
    } catch (error) {
      console.error('Error in openAIService.ask:', error);
    }
  }
}
