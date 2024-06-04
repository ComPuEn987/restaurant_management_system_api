import { Module, forwardRef } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foods } from 'src/entities/foods.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Foods]),
  ],
  controllers: [FoodController],
  providers: [FoodService]
})
export class FoodModule { }
