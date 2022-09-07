import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { truncate, unlinkSync } from 'fs';
import { Link } from 'src/entity/link.entity';
import { getFileURL } from 'src/lib/uuidRandom';
import { Repository } from 'typeorm';
import { linkPost } from './dto/link.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}

  private async saveLink(title: string, imgURL: string, src: string) {
    const link = new Link();
    link.title = title;
    link.imgURL = imgURL;
    link.imgSrc = src;

    return await this.linkRepository.manager.save(link);
  }

  private async findAllLink() {
    return await this.linkRepository.find({
      select: {
        imgSrc: true,
        imgURL: true,
        title: true,
      },
      order: {
        timestamp: 'ASC',
      },
    });
  }

  private async delete(title: string) {
    await this.linkRepository
      .createQueryBuilder()
      .delete()
      .from(Link)
      .where('title = :title', { title: title })
      .execute();
  }

  private async findLink(title: string) {
    return await this.linkRepository
      .createQueryBuilder()
      .where('title = :title', { title: title })
      .getOne();
  }

  async addLink(files: Array<Express.Multer.File>, data: linkPost) {
    return await this.saveLink(
      data.title,
      data.imgURL,
      getFileURL(files, 'link')[0],
    );
  }

  async getAllLink() {
    return await this.findAllLink();
  }

  async deleteLink(title: string) {
    const target = await this.findLink(title);
    const imgPath = target.imgSrc.replace(process.env.SERVER_ADDRESS, '');

    unlinkSync(imgPath);
    await this.delete(title);
  }
}
