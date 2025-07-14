
import { Pedidos } from 'src/entidades/realizar-pedidos/pedidos/pedidos.entity';
import { Grupo } from 'src/entidades/seguridad/grupos/grupos.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Nombre: string;

  @Column()
  Apellido: string;

  @Column()
  Correo: string;

  @Column()
  Contrasena: string;

  @Column()
  Telefono: string;

  @Column({ default: true })
  EstaActivo: boolean;

  @ManyToMany(() => Pedidos, pedidos => pedidos.user)
  @JoinTable({
    name: 'usuario_pedido',         // Nombre de la tabla intermedia
    joinColumn: {
      name: 'usuario_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'pedido_id',
      referencedColumnName: 'idpedido',
    },
  })
  pedidos: Pedidos[];

  @ManyToMany(() => Grupo, grupo => grupo.usuarios)
  @JoinTable({
    name: 'usuario_grupo',         // Nombre de la tabla intermedia
    joinColumn: {
      name: 'usuario_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'grupo_id',
      referencedColumnName: 'id',
    },
  })
  grupos: Grupo[];
}

