import { IsString } from 'class-validator';

export class skillsPost {
  @IsString()
  readonly title: string;
}
