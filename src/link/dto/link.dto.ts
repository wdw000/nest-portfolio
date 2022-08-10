import { IsString, IsUrl } from 'class-validator';

export class linkPost {
  @IsString()
  readonly title: string;

  @IsUrl()
  readonly imgURL: string;
}
