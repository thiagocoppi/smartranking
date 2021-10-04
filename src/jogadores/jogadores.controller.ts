import { JogadoresService } from './jogadores.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import {
    ApiOperation,
    ApiResponse,
    ApiTags
  } from '@nestjs/swagger';
import { Jogador } from './entities/jogadores.entity';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';


@Controller('api/v1/jogadores')
@ApiTags('Jogadores')
export class JogadoresController {


    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Criação de um jogador'})
    @ApiResponse({ status: 201, description: 'Jogador criado' })
    @ApiResponse({ status: 400, description: 'Ocorreu um erro' })
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto): Promise<void> {
        await this.jogadoresService.criarJogador(criarJogadorDto);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Atualização de um jogador'})
    @ApiResponse({ status: 200, description: 'Jogador criado' })
    @ApiResponse({ status: 400, description: 'Ocorreu um erro' })
    async atualizarJogador(
        @Param('id', ValidacaoParametrosPipe) id,
        @Body() atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {
        await this.jogadoresService.atualizarJogador(id, atualizarJogadorDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os jogadores'})
    @ApiResponse({ status: 200, description: 'Jogador removido', type: Jogador, isArray: true })
    @ApiResponse({ status: 400, description: 'Ocorreu um erro' })
    async consultarJogadores(): Promise<Jogador[] | Jogador> {        
        return this.jogadoresService.consultarTodosJogadores();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Buscar um jogador pelo identificador único'})
    @ApiResponse({ status: 200, description: 'Jogador encontrado', type: Jogador })
    @ApiResponse({ status: 400, description: 'Ocorreu um erro' })
    @ApiResponse({ status: 404, description: 'Não encontrado' })
    async consultarJogadoresPeloId(
        @Param('id', ValidacaoParametrosPipe) id: string
    ): Promise<Jogador> {
        return this.jogadoresService.consultarJogadorPeloId(id);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Remover jogador'})
    @ApiResponse({ status: 200, description: 'Jogador removido' })
    @ApiResponse({ status: 400, description: 'Ocorreu um erro' })
    async deletarJogador(
        @Param('id', ValidacaoParametrosPipe) id: string
    ): Promise<void> {
        return this.jogadoresService.removerJogador(id);
    }

}
