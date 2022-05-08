import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { CustomersService } from './customers.service';
@Injectable()
export class UsersService {
  private name = 'Product';

  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private customersService: CustomersService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(filter?: { limit: number; offset: number }): Promise<User[]> {
    return await this.repository.find({
      where: { status: true },
      relations: ['customer'],
      take: filter?.limit,
      skip: filter?.offset,
    });
  }

  async findOne(id: number): Promise<User> {
    const item = await this.repository.findOne(id, { relations: ['customer'] });
    if (!item) {
      throw new NotFoundException(`${this.name} #${id} not found`);
    }
    return item;
  }

  async create(payload: CreateUserDto) {
    const newItem = this.repository.create(payload);

    if (payload.customerId) {
      const customer = await this.customersService.findOne(payload.customerId);
      newItem.customer = customer;
    }

    return await this.repository.save(newItem);
  }

  async update(id: number, payload: UpdateUserDto) {
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

  // async getOrderByUser(id: number) {
  //   const user = await this.repository.findOne(id);
  //   const products = await this.productRepository.find()
  // }
}
