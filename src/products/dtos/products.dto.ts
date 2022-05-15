import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  ArrayMinSize,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly brandId: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsNumber()
  @IsPositive()
  maxPrice: number;
}
