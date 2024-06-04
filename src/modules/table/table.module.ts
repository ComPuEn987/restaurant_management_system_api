import { Module, forwardRef } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tables } from 'src/entities/tables.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Tables]),
  ],
  controllers: [TableController],
  providers: [TableService]
})
export class TableModule { }
