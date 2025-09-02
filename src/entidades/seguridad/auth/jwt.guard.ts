import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '../users/users.entity';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('protected')
export class ProtectedController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProtected(@Req() req: AuthenticatedRequest) {
    return { message: 'You have access', user: req.user };
  }
}
