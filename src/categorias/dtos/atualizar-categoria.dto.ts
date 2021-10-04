import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";
import { Evento } from "../entities/categoria.entity";

export class AtualizarCategoriaDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Essa categoria é para os jogadores de futebol', description: 'Descrição sobre a categoria' })
    descricao: string;

    @IsArray()
    @ArrayNotEmpty()
    @ApiProperty({ type: Evento, isArray: true, description: 'Categoria a ser informada' })
    eventos: Array<Evento>
}