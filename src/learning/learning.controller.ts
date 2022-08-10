import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerLearningOptions } from 'src/lib/multerOptions';
import { learningPost } from './dto/learning.dto';
import { LearningService } from './learning.service';

@Controller('learning')
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @UseInterceptors(FilesInterceptor('images', null, multerLearningOptions))
  @Post()
  addLearning(
    @Body() data: learningPost,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.learningService.addLearning(files, data);
  }

  @Get()
  getLearning() {
    return this.learningService.getAllLearning();
  }

  @Delete(':title')
  deleteLearning(@Param('title') title: string) {
    return this.learningService.deleteLearning(title);
  }
}
