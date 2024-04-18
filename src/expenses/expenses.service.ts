import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expenses.entity';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ExpensesService {
  constructor(@InjectRepository(Expense) private repo: Repository<Expense>) {}

  create(expenseDto: CreateExpenseDto, user: User) {
    const expense = this.repo.create(expenseDto);
    expense.user = user;
    return this.repo.save(expense);
  }

  async changeApproval(id: string, approved: boolean) {
    const expense = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    expense.approved = approved;
    return this.repo.save(expense);
  }

  async createEstimate(estimateDto: GetEstimateDto) {
    const { make, model, lng, lat, year, mileage } = estimateDto;
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
