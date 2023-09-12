import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginUserDTO } from './dto/login.dto';
import { RegisterUserDTO } from './dto/register.dto';
import { UserLoginResponseDTO } from './dto/userLoginResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async decodeToken(token: string): Promise<User | null> {
    try {
      const decodedToken = this.jwtService.decode(token) as { sub: number };
      if (!decodedToken || !decodedToken.sub) {
        return null;
      }

      const userId = decodedToken.sub;
      const user = await this.userService.findById(userId);

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      return null;
    }
  }

  async register(userDto: RegisterUserDTO): Promise<User> {
    console.log(userDto.password);
    if (!userDto.password) {
      throw new BadRequestException('Password is required');
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user: User = {
      email: userDto.email,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      password: hashedPassword,
      chats: [],
      id: null,
    };
    const res = await this.userService.create(user);
    res.password = undefined;
    return res;
  }

  async login(cred: LoginUserDTO): Promise<UserLoginResponseDTO> {
    const user = await this.userService.findByEmail(cred.email);

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(cred.password, user.password);

    if (passwordMatch) {
      user.password = undefined;
      const token = this.jwtService.sign({ ...user });
      return {
        ...user,
        token: token,
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    const passwordIsMatch = await bcrypt.compare(password, user.password);
    console.log(email);

    if (user && passwordIsMatch) {
      return user;
    }

    throw new UnauthorizedException('Incorrect User Data!');
  }
}
