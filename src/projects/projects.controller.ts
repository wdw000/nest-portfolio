import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return 'get projects data';
  }

  @Post()
  addProjects() {
    return 'add projects data';
  }

  @Put()
  updateProjects() {
    return 'update projects data';
  }

  @Delete()
  deleteProjects() {
    return 'delete projects data';
  }
}
