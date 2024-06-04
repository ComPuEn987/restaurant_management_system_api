import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class UserDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'user fullname field cannot be empty' })
    user_fullname: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'username field cannot be empty' })
    username: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'user password field cannot be empty' })
    userpassword: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'user role field cannot be empty' })
    user_role: number;
}