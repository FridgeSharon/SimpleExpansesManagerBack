import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ExpenseDto } from './dtos/expense.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveExpenseDto } from './dtos/approve-expense.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.expensesService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ExpenseDto)
  async createExpense(
    @Body() body: CreateExpenseDto,
    @CurrentUser() user: User,
  ) {
    return this.expensesService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveExpense(@Param('id') id: string, @Body() body: ApproveExpenseDto) {
    return this.expensesService.changeApproval(id, body.approved);
  }
}
