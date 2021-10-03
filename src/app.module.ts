import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [JogadoresModule, 
    MongooseModule
    .forRoot('mongodb+srv://admin:yDqoXW6slTlXzG5H@cluster0.lzeqy.mongodb.net/smartranking?retryWrites=true&w=majority',
    {
      useNewUrlparser: true
    }), CategoriasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
