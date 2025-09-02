import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entidades/seguridad/users/users.entity';
import { UsersModule } from './entidades/seguridad/users/users.module';
import { AuthModule } from './entidades/seguridad/auth/auth.module';
import { CategoriaComidaModule } from './entidades/gestion-menu/categoria-comida/categoria-comida.module';
import { PlatoModule } from './entidades/gestion-menu/plato/plato.module';
import { IngredienteModule } from './entidades/gestion-menu/ingrediente/ingrediente.module';
import { CategoriaComida } from './entidades/gestion-menu/categoria-comida/categoria-comida.entity';
import { Plato } from './entidades/gestion-menu/plato/plato.entity';
import { Ingrediente } from './entidades/gestion-menu/ingrediente/ingrediente.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password', // root
      database: 'tp_bd',
      entities: [User, CategoriaComida, Plato, Ingrediente],
      synchronize: true,
      logger: 'debug',
    }),
    AuthModule,
    UsersModule,
    CategoriaComidaModule,
    PlatoModule,
    IngredienteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
