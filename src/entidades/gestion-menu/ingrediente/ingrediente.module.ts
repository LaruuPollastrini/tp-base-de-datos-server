import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingrediente } from './ingrediente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingrediente])],
  providers: [],
  controllers: [],
  exports: [],
})
export class IngredienteModule {}
