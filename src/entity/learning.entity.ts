import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Learning {
  @PrimaryColumn()
  title: string;

  @Column()
  src: string;
}
