import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [JogadoresModule,
    MongooseModule
      .forRoot('mongodb+srv://admin:yDqoXW6slTlXzG5H@cluster0.lzeqy.mongodb.net/smartranking?retryWrites=true&w=majority',
        {
          useNewUrlparser: true
        }), CategoriasModule]
})
export class AppModule { }
