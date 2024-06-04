import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { FoodDto } from "src/modules/food/dto/food.dto";


export class OrderDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'table id field cannot be empty' })
    table_id: number;

    @ApiProperty()
    foods: FoodDto[];
}