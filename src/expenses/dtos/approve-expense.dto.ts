import { IsBoolean } from 'class-validator';

export class ApproveExpenseDto {
  @IsBoolean()
  approved: boolean;
}
