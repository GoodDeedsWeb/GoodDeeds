/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Inject, Post, Put, Query, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { IGoodDeedService } from 'src/interfaces/services/good.deed.service.interface';
import { GoodDeedCreateDto } from 'src/entities/good_deed_dto/good.deed.create.dto';
import { AuthenticationGuard } from 'src/authentication_guard/authentication.guard';
import { GoodDeedUpdateDto } from 'src/entities/good_deed_dto/good.geed.update.dto';
import { GoodDeedDeleteDto } from 'src/entities/good_deed_dto/good.deed.delete.dto';
import { GoodDeedDto } from 'src/entities/good_deed_dto/good.deed.dto';

@Controller('good-deed')
export class GoodDeedController {
  constructor(@Inject('IGoodDeedService') private readonly goodDeedService: IGoodDeedService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async createGoodDeed(@Body() goodDeedCreate: GoodDeedCreateDto, @Request() req, @Res({ passthrough: true }) res: Response): Promise<string> {
    const result = await this.goodDeedService.createGoodDeed(goodDeedCreate, req.user['sub']);

    res.status(result.statusCode);

    return result.message;
  }

  @UseGuards(AuthenticationGuard)
  @Get()
  async getUserGoodDeeds(@Query('userId') userId: string, @Res({ passthrough: true }) res: Response): Promise<GoodDeedDto[]> {
    const numberUserId = Number(userId);

    if (!numberUserId) {
      res.status(HttpStatus.BAD_REQUEST);
      return;
    }

    const userGoodDeeds = await this.goodDeedService.findByUserId(Number(userId));

    if (!userGoodDeeds) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return userGoodDeeds;
  }

  @UseGuards(AuthenticationGuard)
  @Put()
  async updateGoodDeed(@Body() goodDeedUpdate: GoodDeedUpdateDto, @Res({ passthrough: true }) res: Response){
    const result = await this.goodDeedService.updateGoodDeed(goodDeedUpdate);

    res.status(result.statusCode);

    return result.message;
  }

  @UseGuards(AuthenticationGuard)
  @Delete()
  async deleteUser(@Body() goodDeedDelete: GoodDeedDeleteDto, @Res({ passthrough: true }) res: Response): Promise<string> {
    const result = await this.goodDeedService.deleteGoodDeed(goodDeedDelete);

    res.status(result.statusCode);

    return result.message;
  }
}
