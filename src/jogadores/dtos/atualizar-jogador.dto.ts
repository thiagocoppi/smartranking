import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class AtualizarJogadorDto {
    @IsNotEmpty()
    @ApiProperty({ example: '33238759', description: 'Telefone do jogador' })
    telefone: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'Xpto da Paz', description: 'Nome do jogador' })
    nome: string;
}