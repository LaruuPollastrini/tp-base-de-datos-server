export class PlatoDTO {
  id: number;
  nombre: string;
  ingredientes: { id: number; nombre: string; kcal: number }[];
  kcalTotal: number;
}
