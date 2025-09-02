import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plato } from './plato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plato])],
  providers: [],
  controllers: [],
  exports: [],
})
export class PlatoModule {}
