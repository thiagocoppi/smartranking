import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Jogador } from 'src/jogadores/entities/jogadores.entity';

export class Evento {
    @ApiProperty({ example: 'Evento da Noite', description: 'Nome do evento vinculado' })
    nome: string;

    @ApiProperty({ example: 'Operação da noite', description: 'Nome da operação vinculada' })
    operacao: string;

    @ApiProperty({ example: '15.50', description: 'Valor da operação' })
    valor: number;
}

export class Categoria extends Document {
    @ApiProperty({ example: 'A', description: 'Nível da categoria' })
    categoria: string;

    @ApiProperty({ example: 'Vitoria Lider', description: 'Descrição da Categoria' })
    descricao: string;

    @ApiProperty({ type: Evento, isArray: true, description: 'Eventos relacionados a categorias' })
    eventos: Array<Evento>;

    @ApiProperty({ type: Jogador, isArray: true, description: 'Jogadores vinculados a categoria' })
    jogadores: Array<Jogador>;
}
