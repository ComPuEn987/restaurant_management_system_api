import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/order_details.entity';
import { Orders } from 'src/entities/orders.entity';
import { Tables } from 'src/entities/tables.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Orders)
        private readonly _orderRepository: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private readonly _orderDetailRepository: Repository<OrderDetails>,
        @InjectRepository(Tables)
        private readonly _tableRepository: Repository<Tables>,
    ) { }

    async createAsync(data: OrderDto): Promise<any> {
        const table = await this._tableRepository.findOne({
            where: { id: data.table_id }
        });
        if (!table) {
            throw new NotFoundException(`Table id ${data.table_id} not found`);
        }

        table.table_status = false;
        await this._tableRepository.save(table);

        const newOrder = this._orderRepository.create({
            ... new Orders(),
            table_id: data.table_id,
            total_price: data.foods.map(x => x.price).reduce((a, b) => a + b),
            total_menu: data.foods.map(x => x.quantity).reduce((a, b) => a + b),
            active: true,
            created_at: new Date(),
            order_status: 1,
        });
        const order = await this._orderRepository.save(newOrder);

        if (data.foods.length > 0) {
            data.foods.forEach(el => {
                const orderDetail = this._orderDetailRepository.create({
                    ... new OrderDetails(),
                    order_id: order.id,
                    food_id: el.food_id,
                    quantity: el.quantity,
                    price: el.price,
                    created_at: new Date(),
                    kitchen_status: false,
                });

                this._orderDetailRepository.save(orderDetail);
            });
        }
    }

    async closeOrderAsync(id: number): Promise<any> {
        const order = await this._orderRepository.findOne({
            where: { id: id }
        });
        if (!order) {
            throw new NotFoundException(`Order id ${id} not found`);
        }

        const orderDetails = await this._orderDetailRepository.find({
            where: { order_id: id }
        });
        if (orderDetails.length > 0) {
            let status = orderDetails.filter(x => x.kitchen_status === false && x.cancel_status === true);
            if (status.length > 0) {
                throw new NotFoundException(`Order id ${id} has menu that not yet served`);
            }
        }

        order.active = true;
        order.order_status = 2;
        await this._orderRepository.update(id, order);

        const table = await this._tableRepository.findOne({
            where: { id: order.table_id }
        });
        if (!table) {
            throw new NotFoundException(`Table id ${order.table_id} not found`);
        }

        table.table_status = true;
        await this._tableRepository.update(order.table_id, table);
    }

    async getOrderKitchenStationAsync(): Promise<any> {
        const menus = await this._orderDetailRepository.find({
            where: { kitchen_status: false },
        });

        return menus;
    }

    async updateKitchenStatusAsync(id: number): Promise<any> {
        const menu = await this._orderDetailRepository.findOne({
            where: { id: id }
        });
        if (!menu) {
            throw new NotFoundException(`Menu id ${id} not found`);
        }

        menu.kitchen_status = true;
        menu.cancel_status = false;
        await this._orderDetailRepository.update(id, menu);
    }

    async cancelKitchenStatusAsync(id: number): Promise<any> {
        const menu = await this._orderDetailRepository.findOne({
            where: { id: id }
        });
        if (!menu) {
            throw new NotFoundException(`Menu id ${id} not found`);
        }

        menu.kitchen_status = false;
        menu.cancel_status = true;
        await this._orderDetailRepository.update(id, menu);
    }
}
