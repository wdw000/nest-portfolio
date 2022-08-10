import { IsString } from 'class-validator';

export class learningPost {
  @IsString()
  readonly title: string;
}
