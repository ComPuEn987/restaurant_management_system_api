import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddFoodDto } from './dto/add-food.dto';
import { Foods } from 'src/entities/foods.entity';

@Injectable()
export class FoodService {
    constructor(
        @InjectRepository(Foods)
        private readonly _foodRepository: Repository<Foods>,
    ) { }

    async addAsync(data: AddFoodDto): Promise<any> {
        const food = this._foodRepository.create({
            ... new Foods(),
            food_name: data.name,
            price: Number(data.price),
            active: true,
        });

        return await this._foodRepository.save(food);
    }

    async getAsync(): Promise<any> {
        let foods = await this._foodRepository.find({
            where: {
                active: true,
            }
        });

        return foods;
    }

    async getByIdAsync(id: number): Promise<any> {
        let food = await this._foodRepository.findOne({
            where: { id: id }
        });

        if (!food) {
            throw new NotFoundException(`Food ${id} not found`);
        }
        return food;
    }
}

