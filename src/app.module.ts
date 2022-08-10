import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SkillsModule } from './skills/skills.module';
import { LearningModule } from './learning/learning.module';
import { LinkModule } from './link/link.module';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skills } from './entity/skills.entity';
import { Project } from './entity/project.entity';
import { Link } from './entity/link.entity';
import { Learning } from './entity/learning.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Skills, Project, Link, Learning],
      charset: 'utf8mb4',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SkillsModule,
    LearningModule,
    LinkModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
