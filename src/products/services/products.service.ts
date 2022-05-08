import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { BrandsService } from './brands.service';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandsService: BrandsService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(filter?: {
    limit: number;
    offset: number;
    brand: string;
  }): Promise<Product[]> {
    return await this.productRepo.find({
      where: { status: true },
      take: filter?.limit,
      skip: filter?.offset,
      relations: ['brand'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);

    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId);
      newProduct.brand = brand;
    }

    return await this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.findOne(id);

    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId);
      product.brand = brand;
    }

    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  async deactivate(id: number) {
    const product = await this.findOne(id);
    product.status = false;
    return this.productRepo.save(product);
  }

  async delete(id: number) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }
}
