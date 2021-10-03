import { Body, Controller, Get, HttpException, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiBadRequestResponse
} from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { CategoriasValidacaoParametrosPipe } from './pipe/categoria-validacao-parametros.pipe';

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
    @ApiBadRequestResponse({ type: HttpException})
    async consultarTodasCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaService.buscarTodasCategorias();
    }

    @Get("/:id")
    @ApiOperation({ summary: 'Buscar categoria pelo ID' })
    @ApiResponse({ status: 200, type: Categoria, description: 'Categoria encontrada' })
    @ApiBadRequestResponse({ type: HttpException})
    async consultarCategoriaPeloId(
        @Param('id', CategoriasValidacaoParametrosPipe) id: string
    ): Promise<Categoria> {
        return await this.categoriaService.buscarCategoriaPeloId(id);
    }



}
