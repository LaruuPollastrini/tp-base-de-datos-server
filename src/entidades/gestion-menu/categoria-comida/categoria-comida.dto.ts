import { PlatoDTO } from '../plato/plato.dto';

export class CategoriaComidaDTO {
  id: number;
  nombre: string;
  platos: PlatoDTO[];
}
