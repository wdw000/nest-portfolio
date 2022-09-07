import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryColumn()
  title: string;

  @Column()
  imgSrc: string;

  @Column()
  skills: string;

  @Column('text')
  functions: string;

  @Column({ nullable: true })
  git: string;

  @Column({ nullable: true })
  web: string;

  @Column({ nullable: true })
  pdf: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp: number;
}
