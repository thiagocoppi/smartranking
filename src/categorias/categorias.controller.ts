import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { Body, Controller, Get, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiBadRequestResponse
} from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';

@Controller('api/v1/categorias')
@ApiTags('Categorias')
export class CategoriasController {

    constructor(private readonly categoriaService: CategoriasService) { }

    @Post()
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Criação de uma categoria' })
    @ApiResponse({ status: 201, description: 'Categoria criado' })
    @ApiResponse({ status: 400, description: 'Ocorreu um erro' })
    async criarCategoria(
        @Body() criarCategoriaDto: CriarCategoriaDto): Promise<void> {
        this.categoriaService.criar(criarCategoriaDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas as categorias' })
    @ApiResponse({ status: 200, type: Categoria, isArray: true, description: 'Lista de categorias' })
    @ApiBadRequestResponse({ type: HttpException })
    async consultarTodasCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaService.buscarTodasCategorias();
    }

    @Get("/:id")
    @ApiOperation({ summary: 'Buscar categoria pelo ID' })
    @ApiResponse({ status: 200, type: Categoria, description: 'Categoria encontrada' })
    @ApiBadRequestResponse({ type: HttpException })
    async consultarCategoriaPeloId(
        @Param('id', ValidacaoParametrosPipe) id: string
    ): Promise<Categoria> {
        return await this.categoriaService.buscarCategoriaPeloId(id);
    }

    @Put("/:categoria")
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Atualizar Categoria' })
    @ApiResponse({ status: 200 })
    @ApiBadRequestResponse({ type: HttpException })
    async atualizarCategoria(
        @Param("categoria", ValidacaoParametrosPipe) categoria: string,
        @Body() atualizarCategoriaDto: AtualizarCategoriaDto
    ): Promise<void> {
        return await this.categoriaService.atualizar(categoria, atualizarCategoriaDto);
    }

    @Post("/:categoria/jogador/:idJogador")
    @ApiOperation({ summary: 'Adiciona um jogador a uma categoria' })
    @ApiResponse({ status: 200 })
    @ApiBadRequestResponse({ type: HttpException })
    async atribuirCategoriaJogador(
        @Param("categoria", ValidacaoParametrosPipe) categoria: string, 
        @Param("idJogador", ValidacaoParametrosPipe) idJogador: string) : Promise<void>
    {
        await this.categoriaService.atribuirJogador(categoria, idJogador);
    }

}
