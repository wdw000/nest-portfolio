import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  getLink() {
    return 'get link data';
  }

  @Post()
  addLink() {
    return 'add link data';
  }

  @Put()
  updateLink() {
    return 'update link data';
  }

  @Delete()
  deleteLink() {
    return 'delete link data';
  }
}
