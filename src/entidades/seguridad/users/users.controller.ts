import { Controller, Get, BadRequestException, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
    @Get()
  async getAllUsers(@Headers('Authorization') authHeader: string) {
    try {
      const token = authHeader?.split(' ')[1];
      if (!token) return { message: 'Token no proporcionado' };

      const users = await this.usersService.findAll(token);

      if (!users) return { message: 'Acceso denegado' };

      return users.map(user => ({ id: user.id, email: user.email, role: user.role })) || [];
    } catch (error) {
      return { message: 'Error al procesar la solicitud', error: error.message };
    }
  }
}
