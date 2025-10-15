// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
        private readonly jwtService: JwtService, // 👈 inyectado correctamente

  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findAll(token: string): Promise<User[] | null> {
    try {
      // 🔹 Verifica la validez del token
      const isVerified = this.jwtService.verify(token);
      if (!isVerified) return null;

      // 🔹 Decodifica el token para obtener el rol
      const decoded: any = this.jwtService.decode(token);
      if (!decoded || decoded.role !== 'admin') return null;

      // 🔹 Espera la promesa de la BD
      return await this.usersRepository.find();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return null;
    }
  }

  create(email: string, password: string) {
    const user = this.usersRepository.create({ email, password });
    return this.usersRepository.save(user);
  }
}
