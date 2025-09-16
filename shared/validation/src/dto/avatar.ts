import { IsString, IsNotEmpty } from 'class-validator';

export class AvatarDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  url!: string;
}
