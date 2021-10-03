import { JogadoresService } from './jogadores.service';
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogadores.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {


    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    async criarAtualizarJogador(
        @Body() criarJogadorDto: CriarJogadorDto) {
        await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
    }

    @Get()
    async consultarJogadores(
        @Query('email') email: string
    ): Promise<Jogador[] | Jogador> {
        if (email) {
            return await this.jogadoresService.consultarJogadorPeloEmail(email);
        }
        return this.jogadoresService.consultarTodosJogadores();
    }

    @Delete()
    async deletarJogador(
        @Query('email') email: string
    ): Promise<void> {
        return this.jogadoresService.removerJogador(email);
    }

}
