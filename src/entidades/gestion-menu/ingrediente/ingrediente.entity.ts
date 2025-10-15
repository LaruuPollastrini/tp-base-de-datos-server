import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Plato } from '../plato/plato.entity';

@Entity('ingredientes')
export class Ingrediente {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  nombre: string;

  @Column('float')
  kcal: number;

  @Column()
  cantidad: number;

  @ManyToMany(() => Plato, (plato) => plato.ingredientes)
  plato: Plato;
}
