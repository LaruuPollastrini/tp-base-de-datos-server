import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CategoriaComida } from '../categoria-comida/categoria-comida.entity';
import { Ingrediente } from '../ingrediente/ingrediente.entity';

@Entity('platos')
export class Plato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => CategoriaComida, (categoria) => categoria.platos, {
    onDelete: 'CASCADE',
  })
  categoria: CategoriaComida;

  @OneToMany(() => Ingrediente, (ingrediente) => ingrediente.plato, {
    cascade: true,
    eager: true,
  })
  ingredientes: Ingrediente[];

  // Método para calcular calorías totales del plato
  calcularKcalTotal(): number {
    if (!this.ingredientes) return 0;
    return this.ingredientes.reduce(
      (total, ingrediente) => total + ingrediente.kcal,
      0,
    );
  }
}
