import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'jsonb', nullable: true })
  messages: {
    userId: string;
    message: string;
    response: {
      role: string;
      content: string;
    };
  }[];

  @ManyToOne(() => User, (user) => user.chats)
  user: User;
}
