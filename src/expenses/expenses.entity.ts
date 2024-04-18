import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Expense {
  // default values will be handled by the frontend
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  counterParty: string;

  @Column()
  day: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column()
  expender: string;

  @Column()
  payments: number;

  @Column()
  comment: string;

  @Column()
  repeatFor: number;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;
}
