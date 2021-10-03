import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
export class Jogador extends Document {
    @ApiProperty({ example: 33238759, description: 'Telefone' })
    telefone: string;
    
    @ApiProperty({ example: 'email@email.com', description: 'E-mail' })
    email: string;

    @ApiProperty({ example: 'Xpto da Silva', description: 'Nome' })
    nome: string;

    @ApiProperty({ example: 'A', description: 'Ranking do jogador' })
    ranking: string;

    @ApiProperty({ example: 10, description: 'Ranking atual do jogador' })
    posicaoRanking: string;

    @ApiProperty({ example: 'http://awsp129031290.com/fotoxpto.png', description: 'Foto do jogador' })
    urlFotoJogador: string;
}