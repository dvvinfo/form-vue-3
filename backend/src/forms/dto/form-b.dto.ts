import { IsString, IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';

export class FormBDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  surname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  patronymic: string;

  @IsString()
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Login must contain only Latin characters and numbers' })
  login: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}