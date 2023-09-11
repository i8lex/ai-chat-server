import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        // chat: true,
      },
      relationLoadStrategy: 'join',
    });
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['userWidgets'],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, updateUser: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateUser);
    return this.userRepository.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
