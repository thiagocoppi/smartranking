import { IsNotEmpty } from 'class-validator';
import { Jogador } from 'src/jogadores/entities/jogadores.entity';
import { Resultado } from '../interfaces/desafio.interface';


export class AtribuirDesafioPartidaDto {

  @IsNotEmpty()
  def: Jogador

  @IsNotEmpty()
  resultado: Array<Resultado>
  
}
