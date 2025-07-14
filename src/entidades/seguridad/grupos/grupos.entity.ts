import { Accion } from 'src/entidades/seguridad/acciones/acciones.entity';
import { User } from 'src/entidades/seguridad/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({default: true})
 Estado: boolean;

  @ManyToMany(() => User, usuario => usuario.grupos)
  usuarios: User[];

  @ManyToMany(() => Grupo, grupo => grupo.acciones)
  @JoinTable({
    name: 'grupo_accion',         // Nombre de la tabla intermedia
    joinColumn: {
      name: 'grupo_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'accion_id',
      referencedColumnName: 'id',
    },
  })
  acciones: Accion[];
}