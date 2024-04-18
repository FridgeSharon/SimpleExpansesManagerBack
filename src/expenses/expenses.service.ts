import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expenses.entity';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ExpensesService {
  constructor(@InjectRepository(Expense) private repo: Repository<Expense>) {}

  create(expenseDto: CreateExpenseDto, user: User) {
    const expense = this.repo.create(expenseDto);
    expense.user = user;
    return this.repo.save(expense);
  }
}
