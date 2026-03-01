import {
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { MaterijaliService } from './materijali.service';
import { CreateMaterijaliDto } from './dto/create-materijali.dto';

@Controller('materijali')
export class MaterijaliController {
  constructor(private readonly materijaliService: MaterijaliService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateMaterijaliDto,
    @Headers('authorization') authHeader: string,
  ) {
    if (!file) throw new BadRequestException('Fajl je obavezan.');
    return this.materijaliService.uploadMaterijal(file, body.kompanija_id, authHeader);
  }

  @Get('moje')
  findMoje(@Headers('authorization') authHeader: string) {
    return this.materijaliService.findMoje(authHeader);
  }

  @Get('kompanija/:id')
  findByKompanija(@Param('id') id: string) {
    return this.materijaliService.findByKompanija(+id);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    return this.materijaliService.remove(+id, authHeader);
  }
}
