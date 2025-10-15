// src/favoritos/favorito.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique } from 'typeorm';
import { Plato } from '../plato/plato.entity';
import { User } from 'src/entidades/seguridad/users/users.entity';

@Entity('favoritos')
@Unique(['usuario', 'plato']) // 🔹 evita duplicados del mismo plato por usuario
export class Favorito {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE', eager: true })
  usuario: User;

  @ManyToOne(() => Plato, { onDelete: 'CASCADE', eager: true })
  plato: Plato;

  @CreateDateColumn()
  fechaCreacion: Date;
}
