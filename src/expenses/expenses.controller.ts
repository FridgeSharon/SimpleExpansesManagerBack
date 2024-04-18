import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ExpenseDto } from './dtos/expense.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('reports')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ExpenseDto)
  async createExpense(
    @Body() body: CreateExpenseDto,
    @CurrentUser() user: User,
  ) {
    return this.expensesService.create(body, user);
  }
}
