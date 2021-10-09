import { JogadoresModule } from './../jogadores/jogadores.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { CategoriaSchema } from './entities/categoria.schema';

@Module({
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [CategoriasService],
  imports: [ 
    JogadoresModule,
    MongooseModule.forFeature([
    {
      name: 'Categoria',
      schema: CategoriaSchema
    }
  ])]
})
export class CategoriasModule {}
