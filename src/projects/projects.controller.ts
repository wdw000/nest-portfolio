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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerProjectOptions } from 'src/lib/multerOptions';
import { projectPost } from './dto/projects.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.getAllProject();
  }

  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'images' }, { name: 'pdf' }],
      multerProjectOptions,
    ),
  )
  @Post()
  addProjects(
    @Body() data: projectPost,
    @UploadedFiles()
    files: {
      images?: Array<Express.Multer.File>;
      pdf?: Array<Express.Multer.File>;
    },
  ) {
    return this.projectsService.addProject(files, data);
  }

  @Delete(':title')
  deleteProjects(@Param('title') title: string) {
    return this.projectsService.deleteProject(title);
  }
}
