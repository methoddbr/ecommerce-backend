import { IsNumber } from 'class-validator';

export class InserCartDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
