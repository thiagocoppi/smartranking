import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {

    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>
    ) { }

    async buscarTodasCategorias(): Promise<Categoria[]> {
        return await this.categoriaModel.find().exec();
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
        const categoriaExiste = await this.categoriaModel.findOne({_id: id });
        if (!categoriaExiste) {
            throw new NotFoundException(`A categoria com o ID ${id} não foi encontrada`);
        }

        return categoriaExiste;
    }
}
