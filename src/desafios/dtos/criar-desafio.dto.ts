import { IsNotEmpty, IsDate, IsArray, ArrayMinSize, ArrayMaxSize, IsDateString } from 'class-validator';
import { Jogador } from 'src/jogadores/entities/jogadores.entity';

export class CriarDesafioDto {
  @IsNotEmpty()
  @IsDateString()
  dataHoraDesafio: Date;

  @IsNotEmpty()
  solicitante: Jogador;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  jogadores: Array<Jogador>


}
