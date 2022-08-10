import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';

export class projectPost {
  @IsString()
  title: string;

  @IsArray()
  skills: string[];

  @IsArray()
  functions: string[];

  @IsString()
  git: string;

  @IsString()
  web: string;
}
