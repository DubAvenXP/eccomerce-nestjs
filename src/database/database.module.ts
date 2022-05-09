import { Global, Module } from '@nestjs/common';

import { ConfigType } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Brand } from 'src/products/entities/brand.entity';
import { Category } from 'src/products/entities/category.entity';
import { Customer } from 'src/users/entities/customer.entity';
import { Order } from 'src/users/entities/order.entity';
import { OrderItem } from 'src/users/entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, name, pass, port } = configService.database;
        return Object.assign({
          type: 'postgres',
          host,
          port,
          username: user,
          password: pass,
          database: name,
          synchronize: false,
          autoLoadEntities: true,
        });
      },
    }),
    TypeOrmModule.forFeature([
      Brand,
      Category,
      Customer,
      Order,
      OrderItem,
      Product,
      User,
    ]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
