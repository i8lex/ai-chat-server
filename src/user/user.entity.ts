import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { ApiProperty, ApiTags, ApiResponseProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['email'])
@ApiTags('Users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiResponseProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
  })
  firstName: string;

  @Column()
  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
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

  @Column()
  @ApiProperty({
    example: 'password123',
  })
  password: string;

  @Column()
  @ApiProperty({
    example: 'password123',
  })
  chat: string;
}
