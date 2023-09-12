import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { OpenAIService } from '../openai/openai.service';
import { ChatModule } from '../chat/chat.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ChatModule, UserModule, ConfigModule.forRoot()],
  providers: [SocketGateway, OpenAIService, AuthService, JwtService],
})
export class SocketModule {}
