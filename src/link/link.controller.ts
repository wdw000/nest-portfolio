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
import { multerLinkOptions } from 'src/lib/multerOptions';
import { linkPost } from './dto/link.dto';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @UseInterceptors(FilesInterceptor('images', null, multerLinkOptions))
  @Post()
  addLink(
    @Body() data: linkPost,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.linkService.addLink(files, data);
  }

  @Get()
  getLink() {
    return this.linkService.getAllLink();
  }

  @Delete(':title')
  deleteLink(@Param('title') title: string) {
    return this.linkService.deleteLink(title);
  }
}
