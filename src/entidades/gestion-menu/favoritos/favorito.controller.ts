import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoritosService } from './favorito.service';

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/:platoId')
  async marcarFavorito(@Param('platoId') platoId: string, @Req() req: any) {
    try {
      const user = req.user; // viene del JwtStrategy.validate()
      if (!user) throw new BadRequestException('Usuario no autenticado');

      const favorito = await this.favoritosService.marcarFavorito(
        user.id,
        Number(platoId),
      );

      return {
        message: 'Plato marcado como favorito',
        favorito,
      };
    } catch (error) {
      throw new BadRequestException(
        `Error al marcar favorito: ${error.message}`,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:platoId')
  async desmarcarFavorito(@Param('platoId') platoId: string, @Req() req: any) {
    try {
      const user = req.user;
      if (!user) throw new BadRequestException('Usuario no autenticado');

      await this.favoritosService.eliminarFavorito(user.id, Number(platoId));

      return { message: 'Plato eliminado de favoritos' };
    } catch (error) {
      throw new BadRequestException(
        `Error al eliminar favorito: ${error.message}`,
      );
    }
  }

  // 🔹 Obtener todos los favoritos del usuario logueado
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async obtenerFavoritos(@Req() req: any) {
    try {
      const user = req.user;
      console.log({user})
      if (!user) throw new BadRequestException('Usuario no autenticado');

      const favoritos = await this.favoritosService.obtenerFavoritosDeUsuario(
        user.id,
      );

      return favoritos.map((fav) => ({
        id: fav.plato.id,
        nombre: fav.plato.nombre,
        kcalTotal: fav.plato.calcularKcalTotal
          ? fav.plato.calcularKcalTotal()
          : 0}));
    } catch (error) {
      throw new BadRequestException(
        `Error al obtener favoritos: ${error.message}`,
      );
    }
  }
}
