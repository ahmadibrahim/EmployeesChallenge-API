import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  IsOptional,
  IsEnum
} from "class-validator";

import { GenderEnum } from "constant";

export class CreateEmployeeDto {
  @IsEnum(GenderEnum)
  @MaxLength(1)
  @IsNotEmpty()
  readonly Gender: GenderEnum;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly FirstName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly LastName: string;

  @IsDateString()
  @IsNotEmpty()
  readonly DateOfBirth: string;

  @IsEmail()
  @IsNotEmpty()
  readonly Email: string;

  @IsString()
  @IsNotEmpty()
  readonly Country: string;

  @IsString()
  @IsNotEmpty()
  readonly CountryCode: string;

  @IsNotEmpty()
  readonly PhoneNumber: string;

  @IsString()
  @MaxLength(80)
  @IsOptional()
  readonly Address?: string = "";

  @IsString()
  @IsNotEmpty()
  readonly Department: string;
}
