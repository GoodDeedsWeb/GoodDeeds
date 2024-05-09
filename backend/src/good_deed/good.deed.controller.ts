/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Inject, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { IGoodDeedService } from 'src/interfaces/services/good.deed.service.interface';
import { GoodDeedCreateDto } from 'src/entities/good_deed_dto/good.deed.create.dto';
import { AuthenticationGuard } from 'src/authentication_guard/authentication.guard';
import { GoodDeedUpdateDto } from 'src/entities/good_deed_dto/good.geed.update.dto';
import { GoodDeedDeleteDto } from 'src/entities/good_deed_dto/good.deed.delete.dto';
import { GoodDeedDto } from 'src/entities/good_deed_dto/good.deed.dto';
import { PaginationParameter } from 'src/entities/pagination/pagination.parameters';
import { ResponseMessage } from 'src/entities/response.message';

@Controller('good-deed')
export class GoodDeedController {
  constructor(@Inject('IGoodDeedService') private readonly goodDeedService: IGoodDeedService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async createGoodDeed(@Body() goodDeedCreate: GoodDeedCreateDto, @Res({ passthrough: true }) res: Response): Promise<ResponseMessage> {
    const result = await this.goodDeedService.createGoodDeed(goodDeedCreate);

    res.status(result.StatusCode);

    return { message: result.Message };
  }

  @UseGuards(AuthenticationGuard)
  @Get()
  async getGoodDeeds(@Query('userId') userId: string, @Query() pagingParam: PaginationParameter,  @Res({ passthrough: true }) res: Response): Promise<GoodDeedDto[]> {
    const result = await this.goodDeedService.findByUserId(userId, pagingParam);

    if (!result) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    res.set('X-Pagination', JSON.stringify(result.MetaData));

    return result.GoodDeeds;
  }

  @UseGuards(AuthenticationGuard)
  @Put()
  async updateGoodDeed(@Body() goodDeedUpdate: GoodDeedUpdateDto, @Res({ passthrough: true }) res: Response){
    const result = await this.goodDeedService.updateGoodDeed(goodDeedUpdate);

    res.status(result.StatusCode);

    return result.Message;
  }

  @UseGuards(AuthenticationGuard)
  @Delete()
  async deleteGoodDeed(@Body() goodDeedDelete: GoodDeedDeleteDto, @Res({ passthrough: true }) res: Response): Promise<ResponseMessage> {
    const result = await this.goodDeedService.deleteGoodDeed(goodDeedDelete);

    res.status(result.StatusCode);

    return { message: result.Message };
  }
}
