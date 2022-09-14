import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlinkSync } from 'fs';
import { Learning } from 'src/entity/learning.entity';
import { getFileURL } from 'src/lib/uuidRandom';
import { Repository } from 'typeorm';
import { learningPost } from './dto/learning.dto';

@Injectable()
export class LearningService {
  constructor(
    @InjectRepository(Learning)
    private learningRepository: Repository<Learning>,
  ) {}

  private async saveLearning(title: string, src: string) {
    const learning = new Learning();
    learning.title = title;
    learning.src = src;

    return await this.learningRepository.manager.save(learning);
  }

  private async findAllLearning() {
    return await this.learningRepository.find({
      select: {
        src: true,
        title: true,
      },
      order: {
        timestamp: 'ASC',
      },
    });
  }

  private async delete(title: string) {
    await this.learningRepository
      .createQueryBuilder()
      .delete()
      .from(Learning)
      .where('title = :title', { title: title })
      .execute();
  }

  private async findLearning(title: string) {
    return await this.learningRepository
      .createQueryBuilder()
      .where('title = :title', { title: title })
      .getOne();
  }

  async addLearning(files: Array<Express.Multer.File>, data: learningPost) {
    return await this.saveLearning(
      data.title,
      getFileURL(files, 'learning')[0],
    );
  }

  async getAllLearning() {
    return await this.findAllLearning();
  }

  async deleteLearning(title: string) {
    const target = await this.findLearning(title);

    if (target) {
      const imgPath = target.src.replace(process.env.SERVER_ADDRESS, '');
      unlinkSync(imgPath);
      return await this.delete(title);
    } else {
      throw new BadRequestException();
    }
  }
}
