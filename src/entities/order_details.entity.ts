import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_details')
export class OrderDetails {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: number;

    @Column({ name: 'order_id', nullable: false })
    @ApiProperty()
    order_id: number;

    @Column({ name: 'food_id', nullable: false })
    @ApiProperty()
    food_id: number;

    @Column({ name: 'quantity', nullable: false })
    @ApiProperty()
    quantity: number;

    @Column({ name: 'price', nullable: false })
    @ApiProperty()
    price: number;

    @Column({ name: 'created_at', nullable: false })
    @ApiProperty()
    created_at: Date;

    @Column({ name: 'active', nullable: false })
    @ApiProperty()
    active: boolean;

    @Column({ name: 'kitchen_status', nullable: false })
    @ApiProperty()
    kitchen_status: boolean;

    @Column({ name: 'cancel_status', nullable: false })
    @ApiProperty()
    cancel_status: boolean;
}