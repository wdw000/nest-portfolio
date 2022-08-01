import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SkillsModule } from './skills/skills.module';
import { LearningModule } from './learning/learning.module';
import { LinkModule } from './link/link.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [SkillsModule, LearningModule, LinkModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
