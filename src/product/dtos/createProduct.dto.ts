import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  price: number;

  @IsString()
  image: string;
}
