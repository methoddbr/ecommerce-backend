import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatedAddressDto {
  @IsString()
  @IsOptional()
  complement: string;

  @IsInt()
  numberAddress: number;

  @IsString()
  cep: string;

  @IsInt()
  cityId: number;
}
