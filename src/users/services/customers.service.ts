import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
@Injectable()
export class CustomersService {
  private name = 'Customer';

  constructor(
    @InjectRepository(Customer) private repository: Repository<Customer>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(filter?: {
    limit: number;
    offset: number;
  }): Promise<Customer[]> {
    return await this.repository.find({
      where: { status: true },
      relations: ['customer'],
      take: filter?.limit,
      skip: filter?.offset,
    });
  }

  async findOne(id: number): Promise<Customer> {
    const item = this.repository.findOne(id);
    if (!item) {
      throw new NotFoundException(`${this.name} #${id} not found`);
    }
    return item;
  }

  async create(payload: CreateCustomerDto) {
    const newItem = this.repository.create(payload);
    return await this.repository.save(newItem);
  }

  async update(id: number, payload: UpdateCustomerDto) {
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
