import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tables')
export class Tables {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: number;

    @Column({ name: 'table_status', nullable: false })
    @ApiProperty()
    table_status: boolean;

    @Column({ name: 'active', nullable: false })
    @ApiProperty()
    active: boolean;
}