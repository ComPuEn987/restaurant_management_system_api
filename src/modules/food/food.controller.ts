import { Body, Controller, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FoodService } from './food.service';
import { AuthGuard } from '../auth/auth.guard';
import { AddFoodDto } from './dto/add-food.dto';

@ApiTags('Food')
@Controller('food')
export class FoodController {
    constructor(
        private readonly foodService: FoodService,
    ) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Bearer")
    @Post('get-food')
    async getAsync(@Res() res: any) {
        try {
            const result = await this.foodService.getAsync();

            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Bearer")
    @Post('get-by-id/:id')
    async getById(@Res() res: any, @Query('id') id: number) {
        try {
            const result = await this.foodService.getByIdAsync(id);

            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Bearer")
    @Post('add')
    async addAsync(@Res() res: any, @Body() data: AddFoodDto) {
        try {
            const result = await this.foodService.addAsync(data);

            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
