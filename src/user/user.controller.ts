import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'OK', type: User, isArray: true })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'OK', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'Created', type: User })
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'OK', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: number,
    @Body() updateUser: Partial<User>,
  ): Promise<User> {
    return this.userService.update(id, updateUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
