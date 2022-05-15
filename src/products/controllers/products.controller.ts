import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { CustomParseIntPipe } from '../../common/custom-parse-int.pipe';
import { ProductsService } from '../services/products.service';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/models/roles.model';
import { RolesGuard } from '../../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard) // Proteger un endpoit
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  // @UseGuards(ApiKeyGuard) // Proteger un endpoit
  // @SetMetadata('isPublic', true)
  @Public()
  @Get()
  get(@Query() params: FilterProductsDto) {
    return this.service.findAll(params);
  }

  @Get(':productId')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.service.findOne(productId);
  }

  @Roles(Role.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProductDto): any {
    return this.service.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.service.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  addCategoryToProduct(
    @Param('id', ParseIntPipe) idProduct: number,
    @Param('categoryId', ParseIntPipe) idCategory: number,
  ) {
    return this.service.addCategoryToProduct(idProduct, idCategory);
  }

  @Delete(':id')
  delete(@Param('id', CustomParseIntPipe) id: number) {
    return this.service.deactivate(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.service.removeCategoryByProduct(id, categoryId);
  }
}
