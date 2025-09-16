import {
  IsString,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { AvatarDto } from './avatar.js';

export class UserProfileDto {
  @IsString()
  @IsNotEmpty()
  generatedId!: string;

  @ValidateNested()
  avatar?: AvatarDto;
}

export class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  mobileId!: string;

  @IsNumber()
  @IsNotEmpty()
  password!: number;
}
