import { Favorito } from 'src/entidades/gestion-menu/favoritos/favorito.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: 'admin' | 'user';

  @OneToMany(() => Favorito, (favorito) => favorito.usuario)
  favoritos: Favorito[];
}
