import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
  IsPositive,
  IsIn,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsNotEmpty()
  @IsIn(['customer', 'admin'])
  readonly role: string;

  @IsOptional()
  @IsPositive()
  @IsNotEmpty()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
