import { JogadoresService } from './../jogadores/jogadores.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {

    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
        private readonly jogadorService: JogadoresService
    ) { }

    async atribuirJogador(categoria: string, idJogador: any): Promise<void> {
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();
        
        if (!categoriaEncontrada) {
            throw new NotFoundException(`Não foi encontrada nenhuma categoria ${categoria}`);
        }

        await this.jogadorService.consultarJogadorPeloId(idJogador);
        const jogadorJaCadastradoCategoria = await this.categoriaModel.findOne({ categoria })
        .where('jogadores')
        .in(idJogador);

        if (jogadorJaCadastradoCategoria) {
            throw new BadRequestException(`Jogador ${idJogador} já encontra-se cadastrado na categoria`);
        }

        categoriaEncontrada.jogadores.push(idJogador);
        await this.categoriaModel
        .findOneAndUpdate({ categoria }, 
            {
                jogadores: categoriaEncontrada.jogadores
            })
        .exec();
    }

    async atualizar(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria });

        if (!categoriaEncontrada) {
            throw new NotFoundException(`Não foi encontrada nenhuma categoria ${categoria}`);
        }

        await this.categoriaModel.findOneAndUpdate({
            categoria
        },
            {
                $$set: atualizarCategoriaDto
            }).exec();
    }

    async buscarTodasCategorias(): Promise<Categoria[]> {
        return await this.categoriaModel
        .find()
        .populate('jogadores')
        .exec();
    }

    async criar(criarCategoriaDto: CriarCategoriaDto): Promise<void> {
        const { categoria } = criarCategoriaDto;
        const categoriaCadastrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (categoriaCadastrada) {
            throw new BadRequestException(`A categoria ${categoria} já está cadastrada`);
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
        categoriaCriada.save();
    }

    async buscarCategoriaPeloId(id: string): Promise<Categoria> {
        const categoriaExiste = await this.categoriaModel.findOne({ _id: id });
        if (!categoriaExiste) {
            throw new NotFoundException(`A categoria com o ID ${id} não foi encontrada`);
        }

        return categoriaExiste;
    }
}
