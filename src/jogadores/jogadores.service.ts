import { Jogador } from './interfaces/jogadores.interface';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class JogadoresService {    
    constructor(@InjectModel('Jogador') private readonly jogadorModule: Model<Jogador>) { }

    private readonly logger = new Logger(JogadoresService.name);
    private jogadores: Jogador[] = [];

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = criarJogadorDto;
        // const jogadorEncontrado = this.jogadores.find(x => x.email === email);

        const jogadorEncontrado = await this.jogadorModule.findOne({
            email
        }).exec();

        if (!jogadorEncontrado) {
            this.criar(criarJogadorDto);
            return;
        }

        this.atualizar(criarJogadorDto);
    }

    async removerJogador(email: string): Promise<void> {
        const jogadorEncontrado = this.jogadores.find(x => x.email === email);
        this.jogadorModule.remove({ email }).exec();
    }

    async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
        var jogadorEncontrado = await this.jogadorModule
        .findOne({ email })
        .exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`O jogador com o e-mail ${email} não foi encontrado`);
        }

        return jogadorEncontrado;
    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const jogadorCriado = new this.jogadorModule(criarJogadorDto);
        this.logger.log(`Criando jogador: ${JSON.stringify(criarJogadorDto)}`);
        return await jogadorCriado.save();
    }

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        this.logger.log(`Criando jogador: ${JSON.stringify(criarJogadorDto)}`);
        return await this.jogadorModule.findOneAndUpdate(
            { 
                email: criarJogadorDto.email 
            }, 
            {                
                nome: criarJogadorDto.nome,                
            }).exec();    
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModule.find().exec();
    }

}
