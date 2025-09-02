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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (config: ConfigService)=>({
        type: 'mysql',
        host:
          config.get('MYSQLHOST') ||
          config.get('MYSQL_PUBLIC_URL') ||
          config.get('MYSQL_URL')?.split(':')[0] ||
          'localhost',
        port:
          parseInt(config.get('MYSQLPORT') || config.get('MYSQL_URL')?.split(':')[1] || '3306', 10),
        username: config.get('MYSQLUSER') || 'root',
        password: config.get('MYSQLPASSWORD') || config.get('MYSQL_ROOT_PASSWORD') || '',
        database: config.get('MYSQLDATABASE') || config.get('MYSQL_DATABASE') || '',
        entities: [User, CategoriaComida, Plato, Ingrediente],
        synchronize: process.env.NODE_ENV !== 'production',
        logging: true,
      })
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
