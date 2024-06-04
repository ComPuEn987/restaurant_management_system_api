import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodModule } from './modules/food/food.module';
import { OrderModule } from './modules/order/order.module';
import { TableModule } from './modules/table/table.module';
import { UserModule } from './modules/user/user.module';

// Entities
import { Foods } from './entities/foods.entity';
import { OrderDetails } from './entities/order_details.entity';
import { Orders } from './entities/orders.entity';
import { Tables } from './entities/tables.entity';
import { Users } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: '97.74.86.129',
        port: 3306,
        username: 'peeuser',
        password: 'df^zV0163',
        database: 'pee_',
        synchronize: false,
        entities: [
          Foods,
          OrderDetails,
          Orders,
          Tables,
          Users,
        ],
      }),
    }),
    AuthModule,
    FoodModule,
    OrderModule,
    TableModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
