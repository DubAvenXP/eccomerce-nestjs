import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Injectable()
export class BrandsService {
  private name = 'Brand';

  constructor(@InjectRepository(Brand) private repository: Repository<Brand>) {}

  async findAll(filter?: { limit: number; offset: number }): Promise<Brand[]> {
    return await this.repository.find({
      where: { status: true },
      take: filter?.limit,
      skip: filter?.offset,
    });
  }

  async findOne(id: number): Promise<Brand> {
    const item = await this.repository.findOne(id, {
      where: { status: true },
      relations: ['products'],
    });

    if (!item) {
      throw new NotFoundException(`${this.name} #${id} not found`);
    }

    return item;
  }

  async create(payload: CreateBrandDto) {
    const newItem = this.repository.create(payload);

    return await this.repository.save(newItem);
  }

  async update(id: number, payload: UpdateBrandDto) {
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
