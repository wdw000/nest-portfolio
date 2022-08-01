import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { LearningService } from './learning.service';

@Controller('learning')
export class LearningController {
  constructor(private readonly learningSerrive: LearningService) {}

  @Get()
  getLearning() {
    return 'get learning data';
  }

  @Post()
  addLearning() {
    return 'add learning data';
  }

  @Put()
  updateLearning() {
    return 'update learning data';
  }

  @Delete()
  deleteLearning() {
    return 'delete learning data';
  }
}
