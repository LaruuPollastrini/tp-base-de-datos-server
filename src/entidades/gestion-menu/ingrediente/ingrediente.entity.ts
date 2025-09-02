import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Plato } from '../plato/plato.entity';

@Entity('ingredientes')
export class Ingrediente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('float')
  kcal: number;

  @ManyToOne(() => Plato, (plato) => plato.ingredientes, {
    onDelete: 'CASCADE',
  })
  plato: Plato;
}
