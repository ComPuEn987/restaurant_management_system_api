import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as  bcrypt from 'bcryptjs';
import { UserDto } from './dto/user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly _userRepository: Repository<Users>,
    ) { }

    async findByUsername(username: string): Promise<Users> {
        return await this._userRepository.findOne({
            where: { username: username }
        });
    }

    async createAsync(data: UserDto): Promise<Users> {
        const user = this._userRepository.create({
            ... new Users(),
            user_fullname: data.user_fullname,
            username: data.username,
            userpassword: await this.hashPassword(data.userpassword),
            user_role: data.user_role,
            user_status: true,
            create_by: 99,
            create_date: new Date(),
        });

        return await this._userRepository.save(user);
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    async getAsync(filter: FilterUserDto): Promise<any> {
        let users = await this._userRepository.find();

        if (filter.status !== null && filter.status !== undefined) {
            users = users.filter(x => x.user_status === filter.status);
        }

        users.forEach(x => {
            x.userpassword = null;
        });

        return users;
    }

    async getByIdAsync(id: number): Promise<any> {
        let user = await this._userRepository.findOne({
            where: { user_id: id }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.userpassword = null;
        return user;
    }

    async updateAsync(data: UpdateUserDto): Promise<any> {
        if (data.user_id === null || data.user_id === undefined) {
            throw new BadRequestException('User ID is required');
        }

        let user = await this._userRepository.findOne({
            where: { user_id: data.user_id }
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.user_fullname = data.user_fullname !== undefined ? data.user_fullname : user.user_fullname;
        user.username = data.username !== undefined ? data.username : user.username;
        user.userpassword = data.userpassword !== undefined ? await this.hashPassword(data.userpassword) : user.userpassword;
        user.user_role = data.user_role !== undefined ? data.user_role : user.user_role;
        user.user_status = data.user_status !== undefined ? data.user_status : user.user_status;
        user.update_by = data.update_by;
        user.update_date = new Date();

        const result = await this._userRepository.save(user);

        result.userpassword = null;
        return result;
    }

    async mappingUserRole(role_id: number): Promise<string> {
        switch (role_id) {
            case 1:
                return 'Admin';
            case 2:
                return 'User';
            case 3:
                return 'Kitchen';
            default:
                return 'Unknown';
        }
    }
}
