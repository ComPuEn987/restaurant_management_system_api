import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as  bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt/jwt-payload.inteface';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    public serviceName = 'AuthService';

    constructor(
        private readonly _userService: UserService,
        private readonly _jwt: JwtService,
    ) { }

    async compareHashPassword(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }

    async validateUser(username: string) {
        return await this._userService.findByUsername(username);
    }

    async createToken(data: any): Promise<any> {
        const payload: JwtPayload = {
            _id: data.user_id,
            username: data.username,
            user_email: data.user_email,
            user_role: data.roles?.role_id,
            iat: new Date().getTime(),
        };
        const accessToken = this._jwt.sign(payload);
        return accessToken;
    }

    async decryptJwt(token: string) {
        try {
            const hashToken = this._jwt.decode(token) as JwtPayload;
            return hashToken;
        } catch (e) {
            throw new HttpException(`${this.serviceName} > decryptJwt : ${e}`, HttpStatus.BAD_REQUEST);
        }
    }

    async compareUserRole(roleId: number): Promise<string> {
        return await this._userService.mappingUserRole(roleId);
    }
}
