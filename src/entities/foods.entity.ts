import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('foods')
export class Foods {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: number;

    @Column({ name: 'price', nullable: false })
    @ApiProperty()
    price: number;

    @Column({ name: 'food_name', length: 100, nullable: false })
    @ApiProperty()
    food_name: string;

    @Column({ name: 'active', nullable: false })
    @ApiProperty()
    active: boolean;
}