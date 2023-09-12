import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('chats')
@ApiTags('chats')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get all chats' })
  // @ApiResponse({ status: 200, description: 'OK', type: Chat, isArray: true })
  // async findAll(): Promise<Chat[]> {
  //   return this.chatService.findAll();
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Chat a user by ID' })
  @ApiResponse({ status: 200, description: 'OK', type: Chat })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findById(@Param('id') id: number): Promise<Chat> {
    if (id) {
      return this.chatService.findById(id);
    } else {
      console.log('error');
    }
  }

  // @Post(':id/create')
  // @ApiOperation({ summary: 'Create a new chat' })
  // @ApiResponse({ status: 201, description: 'Created', type: Chat })
  // async create(@Param('id') id: string): Promise<Chat> {
  //   return this.chatService.createChat(parseInt(id));
  // }
  @Get()
  async getAllChats(@Request() req) {
    const userId = req.user.id;
    const chats = await this.chatService.getChatsByUserId(userId);
    return chats;
  }
  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a user by ID' })
  // @ApiResponse({ status: 204, description: 'No Content' })
  // @ApiResponse({ status: 404, description: 'User not found' })
  // async delete(@Param('id') id: number): Promise<void> {
  //   return this.chatService.delete(id);
  // }
}
