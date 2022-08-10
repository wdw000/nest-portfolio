import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skills } from 'src/entity/skills.entity';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skills])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
