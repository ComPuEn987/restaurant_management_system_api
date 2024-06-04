import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService,
    ) { }

    @Public()
    @Post('login-user')
    async login(@Res() res: any, @Body() data: LoginUserDto) {
        const user = await this._authService.validateUser(data.username);
        if (!user) {
            return await res.status(HttpStatus.FORBIDDEN).json({ message: 'ไม่พบอีเมลหรือชื่อนี้ในระบบ' });
        }
        if (!await this._authService.compareHashPassword(data.password, user.userpassword)) {
            return await res.status(HttpStatus.FORBIDDEN).json({ message: 'กรุณาตรวจสอบชื่อผู้ใช้กับรหัสผ่านอีกครั้ง' });
        }
        
        const token = await this._authService.createToken(user);

        return res.status(HttpStatus.OK).json({
            data: {
                id: user.user_id,
                fullName: user.user_fullname,
                username: user.username,
                avatar: '',
                email: user.username,
                role: (await this._authService.compareUserRole(user.user_role)).toLowerCase(),
                token: token,
            }
        });
    }
}
