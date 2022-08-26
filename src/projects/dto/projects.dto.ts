import { IsArray, IsString } from 'class-validator';

export interface Skill {
  title: string;
  src: string;
}

export class projectPost {
  @IsString()
  readonly title: string;

  @IsArray()
  readonly skills: Skill[];

  @IsArray()
  readonly functions: string[];

  @IsString()
  readonly git: string;

  @IsString()
  readonly web: string;
}
