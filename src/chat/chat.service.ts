import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { User } from '../user/user.entity';

type Message = {
  userId: string;
  message: string;
  response: {
    role: string;
    content: string;
  };
};
@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // async createChat(userId: number): Promise<Chat> {
  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //
  //   const chat = new Chat();
  //   chat.userId = user.id;
  //
  //   const savedChat = await this.chatRepository.save(chat);
  //
  //   user.chats = [savedChat];
  //   await this.userRepository.save(user);
  //
  //   return savedChat;
  // }
  async getChatsByUserId(userId: number): Promise<Chat[]> {
    return await this.chatRepository.find({ where: { userId } });
  }

  async findById(id: number): Promise<Chat> {
    if (!id) {
      console.log('error');
      return;
      // throw new NotFoundException('Chat not found');
    } else {
      return await this.chatRepository.findOne({ where: { id } });
    }
  }
  async saveChat(
    chatId: number,
    userId: number,
    messages: Message,
  ): Promise<Chat> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!chatId) {
      const chat = new Chat();
      chat.userId = user.id;
      chat.messages = [messages];
      const savedChat = await this.chatRepository.save(chat);
      // user.chats.push(savedChat);
      await this.userRepository.save(user);

      return savedChat;
    } else {
      const chat = await this.chatRepository.findOne({
        where: { id: chatId },
      });
      chat.messages.push(messages);
      return this.chatRepository.save(chat);
    }
  }
}
