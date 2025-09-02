import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Plato } from '../plato/plato.entity';

@Entity('categorias_comida')
export class CategoriaComida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Plato, (plato) => plato.categoria)
  platos: Plato[];
}
