import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class AddFoodDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'name field cannot be empty' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'price field cannot be empty' })
    price: string;
}