import { Global, Module } from '@nestjs/common';

import { ConfigType } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
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
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
