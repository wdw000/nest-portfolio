import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  getSkillsData() {
    return 'skills data';
  }

  @Post()
  addSkillsData() {
    return 'add skills data';
  }

  @Put()
  updateSkillsData() {
    return 'updated skills data';
  }

  @Delete()
  deleteSkillsData() {
    return 'delete skills data';
  }
}
