import { IsString, IsNotEmpty } from "class-validator";

export class CreateBookmarkDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    title: string


    @IsString()
    description: string

    @IsString()
    link: string
}