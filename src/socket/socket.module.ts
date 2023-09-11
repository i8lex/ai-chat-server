import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { OpenAIService } from '../openai/openai.service';

@Module({
  providers: [SocketGateway, OpenAIService],
})
export class SocketModule {}
