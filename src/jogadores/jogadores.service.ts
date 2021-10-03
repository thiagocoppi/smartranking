
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './entities/jogadores.entity';


@Injectable()
export class JogadoresService {

    private readonly logger = new Logger(JogadoresService.name);

    constructor(@InjectModel('Jogador') private readonly jogadorModule: Model<Jogador>) { }

    async criarJogador(criarJogadorDto: CriarJogadorDto) {
        const jogadorEncontrado = await this.jogadorModule.findOne({
            email: criarJogadorDto.email
        }).exec();

        if (jogadorEncontrado) {
            this.logger.error(`Já existe um jogador cadastrado com o e-mail ${criarJogadorDto.email}`);
            throw new BadRequestException(`Já existe um jogador cadastrado com o e-mail ${criarJogadorDto.email}`);
        }

        const jogadorCriado = new this.jogadorModule(criarJogadorDto);
        this.logger.log(`Criando jogador: ${JSON.stringify(criarJogadorDto)}`);
        return await jogadorCriado.save();
    }

    async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {
        this.logger.log(`Atualizando jogador: ${JSON.stringify(atualizarJogadorDto)}`);

        const jogadorEncontrado = await this.jogadorModule.findOne({
            _id
        }).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`O jogador com o id ${_id} não foi encontrado`);
        }

        await this.jogadorModule.findOneAndUpdate(
            {
                _id
            },
            {
                nome: atualizarJogadorDto.nome,
                telefone: atualizarJogadorDto.telefone
            }).exec();
    }

    async consultarJogadorPeloId(_id: string): Promise<Jogador> {
        var jogador = await this.jogadorModule.findOne({ _id });
        if (!jogador) {
            throw new NotFoundException(`O jogador com o id ${_id} não foi encontrado`);
        }
        return jogador;
    }

    async removerJogador(_id: string): Promise<void> {
        await this.jogadorModule.deleteOne({ _id }).exec();
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

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModule.find().exec();
    }

}
