import { Body, Controller, Header, Post, Query, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { Public } from '../auth/decorator/public.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Public()
    @Post('create')
    @Header('Content-Type', 'application/json')
    async create(@Res() res: any, @Body() data: UserDto) {
        try {
            const result = await this.userService.createAsync(data);

            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Bearer")
    @Post('get-b-users')
    async getProducts(@Res() res: any, @Body() data: FilterUserDto) {
        try {
            const result = await this.userService.getAsync(data);

            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Bearer")
    @Post('get-by-id/:user_id')
    async getById(@Res() res: any, @Query('productId') productId: number) {
        try {
            const result = await this.userService.getByIdAsync(productId);

            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth("Bearer")
    @Post('update')
    async update(@Res() res: any, @Body() data: UpdateUserDto) {
        try {
            const result = await this.userService.updateAsync(data);

            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
