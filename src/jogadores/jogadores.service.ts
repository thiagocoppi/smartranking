import { Jogador } from './interfaces/jogadores.interface';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class JogadoresService {    
    private readonly logger = new Logger(JogadoresService.name);
    private jogadores: Jogador[] = [];

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = criarJogadorDto;
        const jogadorEncontrado = this.jogadores.find(x => x.email === email);

        if (!jogadorEncontrado) {
            this.criar(criarJogadorDto);
            return;
        }

        this.atualizar(jogadorEncontrado, criarJogadorDto);
    }

    async removerJogador(email: string): Promise<void> {
        const jogadorEncontrado = this.jogadores.find(x => x.email === email);
        this.jogadores = this.jogadores.filter(x => x.email !== jogadorEncontrado.email);
    }

    async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
        var jogadorEncontrado = this.jogadores.find(x => x.email === email);
        if (!jogadorEncontrado) {
            throw new NotFoundException(`O jogador com o e-mail ${email} não foi encontrado`);
        }

        return jogadorEncontrado;
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

    private atualizar(jogador: Jogador, criarJogadorDto: CriarJogadorDto): void {
        jogador.nome = criarJogadorDto.nome;

    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return this.jogadores;
    }

}
