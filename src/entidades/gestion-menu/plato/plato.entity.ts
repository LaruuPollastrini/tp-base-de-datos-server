import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => Ingrediente, (ingrediente) => ingrediente.plato, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'platos_ingredientes',
    joinColumn: { name: 'platoId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ingredienteId', referencedColumnName: 'id' },
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
