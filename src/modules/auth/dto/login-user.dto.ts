import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'กรุณากรอกชื่อผู้ใช้' })
    username: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'กรุณากรอกรหัสผ่าน' })
    password: string;
}