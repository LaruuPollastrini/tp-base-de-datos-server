// src/favoritos/favoritos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorito } from './favorito.entity';
import { Plato } from '../plato/plato.entity';
import { User } from 'src/entidades/seguridad/users/users.entity';

@Injectable()
export class FavoritosService {
  constructor(
    @InjectRepository(Favorito)
    private readonly favoritosRepo: Repository<Favorito>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Plato)
    private readonly platosRepo: Repository<Plato>,
  ) {}

  async marcarFavorito(userId: number, platoId: number) {
    const usuario = await this.usersRepo.findOneBy({ id: userId });
    const plato = await this.platosRepo.findOneBy({ id: platoId });

    if (!usuario || !plato) throw new Error('Usuario o plato no encontrado');

    // Verifica si ya existe
    const existe = await this.favoritosRepo.findOne({ where: { usuario, plato } });
    if (existe) return existe;

    const favorito = this.favoritosRepo.create({ usuario, plato });
    return this.favoritosRepo.save(favorito);
  }

  async eliminarFavorito(userId: number, platoId: number) {
    const usuario = await this.usersRepo.findOneBy({ id: userId });
    const plato = await this.platosRepo.findOneBy({ id: platoId });
    if (usuario && plato) {
        await this.favoritosRepo.delete({ usuario, plato });
    }
  }

  async obtenerFavoritosDeUsuario(userId: number) {
    return this.favoritosRepo.find({
      where: { usuario: { id: userId } },
      relations: ['plato'],
    });
  }
}
