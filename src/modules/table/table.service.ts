import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tables } from 'src/entities/tables.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TableService {
    constructor(
        @InjectRepository(Tables)
        private readonly _tableRepository: Repository<Tables>,
    ) { }
    
    async getAsync(): Promise<any> {
        let tables = await this._tableRepository.find();

        return tables;
    }

    async getByIdAsync(id: number): Promise<any> {
        let table = await this._tableRepository.findOne({
            where: { id: id }
        });

        if (!table) {
            throw new NotFoundException('table not found');
        }
        return table;
    }
}
