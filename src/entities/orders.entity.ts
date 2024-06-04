import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Orders {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: number;

    @Column({ name: 'table_id', nullable: false })
    @ApiProperty()
    table_id: number;

    @Column({ name: 'total_price', nullable: false })
    @ApiProperty()
    total_price: number;

    @Column({ name: 'total_menu', nullable: false })
    @ApiProperty()
    total_menu: number;

    @Column({ name: 'created_at', nullable: false })
    @ApiProperty()
    created_at: Date;

    @Column({ name: 'active', nullable: false })
    @ApiProperty()
    active: boolean;

    @Column({ name: 'order_status', nullable: false }) // 1: cooking, 2: done
    @ApiProperty()
    order_status: number;
}