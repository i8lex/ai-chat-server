import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatMessageRepository: Repository<Chat>,
  ) {}

  async saveMessage(userId: string, message: string): Promise<Chat> {
    const newMessage = new Chat();
    newMessage.userId = userId;
    newMessage.message = message;

    const savedMessage = await this.chatMessageRepository.save(newMessage);

    return savedMessage;
  }

  async getAllMessages(): Promise<Chat[]> {
    return await this.chatMessageRepository.find();
  }

  async sendMessage(userId: string, message: string): Promise<Chat> {
    const sentMessage = new Chat();
    sentMessage.userId = userId;
    sentMessage.message = message;

    return sentMessage;
  }
}
