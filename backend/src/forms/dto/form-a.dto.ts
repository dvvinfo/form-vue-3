import { IsString, IsOptional, IsEmail, IsNotEmpty, MinLength, Matches, IsNumberString } from 'class-validator';

export class FormADto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNumberString()
  @IsNotEmpty()
  @Matches(/^(?:\d{10}|\d{12})$/, { message: 'INN must be 10 or 12 digits' })
  inn: string;

  @IsNumberString()
  @IsNotEmpty()
  @Matches(/^\+7\d{10}$/, { message: 'Phone must be in +7 format with exactly 11 digits' })
  phone: string;
}