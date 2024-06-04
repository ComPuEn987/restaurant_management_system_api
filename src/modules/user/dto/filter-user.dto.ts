import { ApiProperty } from "@nestjs/swagger";


export class FilterUserDto {
    @ApiProperty()
    status: boolean;
}