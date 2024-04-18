import { Expose, Transform } from 'class-transformer';

export class ExpenseDto {
  @Expose()
  id: number;

  @Expose()
  amount: number;

  @Expose()
  counterParty: string;

  @Expose()
  day: number;

  @Expose()
  month: number;

  @Expose()
  year: number;

  @Expose()
  expender: string;

  @Expose()
  payments: number;

  @Expose()
  comment: string;

  @Expose()
  repeatFor: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
