import { /* Inject, */ Injectable, NotFoundException } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';
// import config from '../../config';

@Injectable()
export class CategoriesService {
  private name = 'Category';
  constructor(
    // @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  async findAll(filter?: {
    limit: number;
    offset: number;
  }): Promise<Category[]> {
    return await this.repository.find({
      where: { status: true },
      take: filter?.limit,
      skip: filter?.offset,
    });
  }

  async findOne(id: number): Promise<Category> {
    const item = await this.repository.findOne(id, { relations: ['products'] });
    if (!item) {
      throw new NotFoundException(`${this.name} #${id} not found`);
    }
    return item;
  }

  async create(payload: CreateCategoryDto) {
    const newItem = this.repository.create(payload);
    return await this.repository.save(newItem);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const item = await this.findOne(id);
    this.repository.merge(item, payload);
    return this.repository.save(item);
  }

  async deactivate(id: number) {
    const item = await this.findOne(id);
    item.status = false;
    return this.repository.save(item);
  }

  async delete(id: number) {
    const item = await this.findOne(id);
    return this.repository.remove(item);
  }
}
