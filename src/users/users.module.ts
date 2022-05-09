import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders.service';
import { CustomersService } from './services/customers.service';
import { OrderItemService } from './services/order-item.service';
import { OrderItemController } from './controllers/order-item.controller';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrderItemController,
  ],
  providers: [UsersService, OrdersService, CustomersService, OrderItemService],
  exports: [UsersService],
})
export class UsersModule {}
