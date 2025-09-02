import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  // Register a new user
  async register(userData: { email: string; password: string }) {
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) throw new Error('User already exists');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.password, salt);

    await this.usersService.create(userData.email, passwordHash);

    return { message: 'User registered' };
  }

  // Login existing user
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
