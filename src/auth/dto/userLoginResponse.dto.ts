import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginResponseDTO {
  @PrimaryGeneratedColumn()
  @ApiResponseProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({
    description: 'The name of the user.',
    example: 'John',
  })
  firstName: string;

  @Column()
  @ApiProperty({
    description: 'The name of the user.',
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

  @Column()
  @ApiProperty({
    example: 'string',
  })
  token: string;
}
