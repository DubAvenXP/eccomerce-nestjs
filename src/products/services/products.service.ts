import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindConditions } from 'typeorm';

import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dto';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(params?: FilterProductsDto): Promise<Product[]> {
    const where: FindConditions<Product> = {};
    where.status = true;
    if (params.minPrice && params.maxPrice) {
      where.price = Between(params.minPrice, params.maxPrice);
    }

    return await this.productRepo.find({
      where,
      take: params?.limit ?? 10,
      skip: params?.offset ?? 0,
      relations: ['brand'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);

    if (payload.brandId) {
      const brand = await this.brandRepo.findOne(payload.brandId);
      newProduct.brand = brand;
    }

    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        payload.categoriesIds,
      );
      newProduct.categories = categories;
    }

    return await this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.findOne(id);

    if (payload.brandId) {
      const brand = await this.brandRepo.findOne(payload.brandId);
      product.brand = brand;
    }

    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        payload.categoriesIds,
      );
      product.categories = categories;
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

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });

    const category = await this.categoryRepo.findOne(categoryId);

    if (!product.categories.includes(category)) {
      product.categories.push(category);
    }

    return this.productRepo.save(product);
  }
}
