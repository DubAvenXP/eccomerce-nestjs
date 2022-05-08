import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private service: BrandsService) {}

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Get('/:id')
  async getCategory(@Param('id') id: number) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateBrandDto) {
    return await this.service.create(payload);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return await this.service.update(id, payload);
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.deactivate(id);
  }
}
