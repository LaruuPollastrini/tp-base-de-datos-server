import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorito } from './favorito.entity';
import { FavoritosService } from './favorito.service';
import { FavoritosController } from './favorito.controller';
import { User } from '../../seguridad/users/users.entity';
import { Plato } from '../plato/plato.entity';
import { AuthModule } from 'src/entidades/seguridad/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favorito, User, Plato]), AuthModule],
  providers: [FavoritosService],
  controllers: [FavoritosController],
})
export class FavoritosModule {}
