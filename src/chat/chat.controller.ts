import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  async getAllMessages() {
    return this.chatService.getAllMessages();
  }

  @Post()
  async sendMessage(userId: string, message: string): Promise<Chat> {
    const sentMessage = new Chat();
    sentMessage.userId = userId;
    sentMessage.message = message;

    return sentMessage;
  }
}
