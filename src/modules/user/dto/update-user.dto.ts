import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'User ID is required' })
    user_id: number;

    @ApiProperty()
    user_fullname: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    userpassword: string;

    @ApiProperty()
    user_role: number;

    @ApiProperty()
    user_status: boolean;

    @ApiProperty()
    update_by: number;
}