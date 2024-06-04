import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FoodDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'food id field cannot be empty' })
    food_id: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'quantity field cannot be empty' })
    quantity: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'price field cannot be empty' })
    price: number;
}