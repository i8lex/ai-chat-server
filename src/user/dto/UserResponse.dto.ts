import { PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Chat } from '../../chat/chat.entity';

export class UserResponseDTO {
  @PrimaryGeneratedColumn()
  @ApiResponseProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({
    description: 'The first name of the user.',
    example: 'John',
  })
  firstName: string;

  @Column()
  @ApiProperty({
    description: 'The last name of the user.',
    example: 'Doe',
  })
  lastName: string;

  @Column()
  @ApiProperty({
    description: 'The email of the user.',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];
}
