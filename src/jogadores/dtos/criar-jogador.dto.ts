import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CriarJogadorDto {
    @IsNotEmpty()
    @ApiProperty({ example: '33238759', description: 'Telefone do jogador' })
    readonly telefone: string;

    @IsEmail()
    @ApiProperty({ example: 'xpto@email.com.br', description: 'Email do jogador' })
    readonly email: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'Xpto da Paz', description: 'Nome do jogador' })
    readonly nome: string;
}