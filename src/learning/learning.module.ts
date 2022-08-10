import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Learning } from 'src/entity/learning.entity';
import { LearningController } from './learning.controller';
import { LearningService } from './learning.service';

@Module({
  imports: [TypeOrmModule.forFeature([Learning])],
  controllers: [LearningController],
  providers: [LearningService],
})
export class LearningModule {}
