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
import { multerSkillsOptions } from 'src/lib/multerOptions';
import { skillsPost } from './dto/skills.dto';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @UseInterceptors(FilesInterceptor('images', null, multerSkillsOptions))
  @Post()
  addSkillsData(
    @Body() data: skillsPost,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.skillsService.addSkill(files, data);
  }

  @Get()
  getSkillsData() {
    return this.skillsService.getAllSkills();
  }

  @Delete(':title')
  deleteSkillsData(@Param('title') title: string) {
    return this.skillsService.deleteSkill(title);
  }
}
