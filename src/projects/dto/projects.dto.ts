import { IsArray, IsString } from 'class-validator';

export class projectPost {
  @IsString()
  readonly title: string;

  @IsArray()
  readonly skills: string[];

  @IsArray()
  readonly functions: string[];

  @IsString()
  readonly git: string;

  @IsString()
  readonly web: string;
}
