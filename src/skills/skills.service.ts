import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlinkSync } from 'fs';
import { Skills } from 'src/entity/skills.entity';
import { getFileURL } from 'src/lib/uuidRandom';
import { Repository } from 'typeorm';
import { skillsPost } from './dto/skills.dto';
@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skills)
    private skillsRepository: Repository<Skills>,
  ) {}

  private async saveSkill(title: string, src: string) {
    const skills = new Skills();
    skills.title = title;
    skills.src = src;
    return await this.skillsRepository.manager.save(skills);
  }

  private async findAllSkills() {
    const result = await this.skillsRepository.find();

    return result;
  }

  private async delete(title: string) {
    await this.skillsRepository
      .createQueryBuilder()
      .delete()
      .from(Skills)
      .where('title = :title', { title: title })
      .execute();
  }

  private async findSkills(title: string) {
    return await this.skillsRepository
      .createQueryBuilder()
      .where('title = :title', { title: title })
      .getOne();
  }

  async addSkill(files: Array<Express.Multer.File>, data: skillsPost) {
    return await this.saveSkill(data.title, getFileURL(files, 'skills')[0]);
  }

  async getAllSkills() {
    return await this.findAllSkills();
  }

  async deleteSkill(title: string) {
    const target = await this.findSkills(title);
    const imgPath = target.src.replace(process.env.SERVER_ADDRESS, '');
    unlinkSync(imgPath);
    return await this.delete(title);
  }
}
