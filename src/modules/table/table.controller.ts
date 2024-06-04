import { Controller, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TableService } from './table.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Table')
@Controller('table')
export class TableController {
    constructor(
        private readonly tableService: TableService,
    ) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Bearer")
    @Post('get-tables')
    async getProducts(@Res() res: any) {
        try {
            const result = await this.tableService.getAsync();

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
            const result = await this.tableService.getByIdAsync(id);

            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
