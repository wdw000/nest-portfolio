import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlinkSync } from 'fs';
import { Project } from 'src/entity/project.entity';
import { getFileURL } from 'src/lib/uuidRandom';
import { Repository } from 'typeorm';
import { projectPost } from './dto/projects.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  private async save(
    title: string,
    skills: string[],
    functions: string[],
    imgSrc: string,
    git: string | null,
    web: string | null,
    pdf: string | null,
  ) {
    const project = new Project();
    project.title = title;
    project.skills = JSON.stringify(skills);
    project.functions = JSON.stringify(functions);
    project.git = git;
    project.web = web;
    project.pdf = pdf;
    project.imgSrc = imgSrc;

    return await this.projectRepository.manager.save(project);
  }

  private async findAllProject() {
    return await this.projectRepository.find({
      select: {
        functions: true,
        git: true,
        imgSrc: true,
        pdf: true,
        skills: true,
        title: true,
        web: true,
      },
      order: {
        timestamp: 'ASC',
      },
    });
  }

  private async delete(title: string) {
    return await this.projectRepository
      .createQueryBuilder()
      .delete()
      .from(Project)
      .where('title = :title', { title: title })
      .execute();
  }

  private async findProject(title: string) {
    return await this.projectRepository
      .createQueryBuilder()
      .where('title = :title', { title: title })
      .getOne();
  }

  async addProject(
    files: {
      images?: Array<Express.Multer.File>;
      pdf?: Array<Express.Multer.File>;
    },
    data: projectPost,
  ) {
    const git = data.git === '' ? null : data.git;
    const web = data.web === '' ? null : data.web;
    const pdf = getFileURL(files.pdf, 'project');
    const img = getFileURL(files.images, 'project');

    return await this.save(
      data.title,
      data.skills,
      data.functions,
      img[0],
      git,
      web,
      pdf[0],
    );
  }

  async getAllProject() {
    return await this.findAllProject();
  }

  async deleteProject(title: string) {
    const target = await this.findProject(title);

    if (target) {
      const imgPath = target.imgSrc.replace(process.env.SERVER_ADDRESS, '');
      const pdfPath = target.pdf.replace(process.env.SERVER_ADDRESS, '');

      unlinkSync(imgPath);
      unlinkSync(pdfPath);
      await this.delete(title);
    } else {
      throw new BadRequestException();
    }
  }
}
