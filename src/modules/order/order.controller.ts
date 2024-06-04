import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';
import { OrderDto } from './dto/order.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Bearer")
    @Post('open-order')
    async openOrder(@Res() res: any, @Body() data: OrderDto) {
        try {
            const result = await this.orderService.createAsync(data);

            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Bearer")
    @Post('close-order')
    async closeOrder(@Res() res: any, @Query('id') id: number) {
        try {
            const result = await this.orderService.closeOrderAsync(id);

            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Bearer")
    @Get('get-order-kitchen-station')
    async getOrderKitchenStationAsync(@Res() res: any) {
        try {
            const result = await this.orderService.getOrderKitchenStationAsync();

            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Bearer")
    @Get('update-kitchen-status')
    async updateKitchenStatusAsync(@Res() res: any, @Query('id') id: number) {
        try {
            const result = await this.orderService.updateKitchenStatusAsync(id);

            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Bearer")
    @Get('cancel-kitchen-status')
    async cancelKitchenStatusAsync(@Res() res: any, @Query('id') id: number) {
        try {
            const result = await this.orderService.cancelKitchenStatusAsync(id);

            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
