import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Skills {
  @PrimaryColumn()
  title: string;

  @Column()
  src: string;
}
