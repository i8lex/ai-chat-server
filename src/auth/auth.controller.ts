import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginUserDTO } from './dto/login.dto';
import { RegisterUserDTO } from './dto/register.dto';
import { UserResponseDTO } from 'src/user/dto/UserResponse.dto';
import { UserLoginResponseDTO } from './dto/userLoginResponse.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
    type: UserResponseDTO,
  })
  @ApiBody({ type: RegisterUserDTO, required: true })
  async register(@Body() user: RegisterUserDTO): Promise<User> {
    console.log(user);
    return this.authService.register(user);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully authenticated.',
    type: UserLoginResponseDTO,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({ type: LoginUserDTO, required: true })
  async login(@Body() loginData: LoginUserDTO): Promise<UserLoginResponseDTO> {
    return this.authService.login(loginData);
  }
}
