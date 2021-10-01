import { Jogador } from './interfaces/jogadores.interface';
import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import {v4 as uuidv4} from 'uuid';


@Injectable()
export class JogadoresService {
    private readonly logger = new Logger(JogadoresService.name);
    private jogadores: Jogador[] = [];
    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        this.criar(criarJogadorDto);
    }
    
    private criar(criarJogadorDto: CriarJogadorDto): void {
        const { nome, email, telefoneCelular } = criarJogadorDto;
        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefone: telefoneCelular,
            email,
            ranking: "A",
            posicaoRanking: "1",
            urlFotoJogador: "xpto"
        }
        this.logger.log(`Criando jogador: ${JSON.stringify(jogador)}`);

        this.jogadores.push(jogador);
    }

}
