import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaComida } from './categoria-comida.entity';
import { CategoriaComidaService } from './categoria-comida.service';
import { CategoriaComidaController } from './categoria-comida.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaComida])],
  providers: [CategoriaComidaService],
  controllers: [CategoriaComidaController],
  exports: [CategoriaComidaService],
})
export class CategoriaComidaModule {}
