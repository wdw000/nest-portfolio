import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Link {
  @PrimaryColumn()
  title: string;

  @Column()
  imgURL: string;

  @Column()
  imgSrc: string;
}
