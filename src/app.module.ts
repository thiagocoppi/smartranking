import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [JogadoresModule, 
    MongooseModule
    .forRoot('mongodb+srv://admin:<pw>@cluster0.lzeqy.mongodb.net/smartranking?retryWrites=true&w=majority',
    {
      useNewUrlparser: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
