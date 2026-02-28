import { IsString } from "class-validator";

export class CreateKompanijaDto {
    @IsString()
    naziv: string;

    @IsString()
    websajt: string;

    @IsString()
    kontakt: string;
}
