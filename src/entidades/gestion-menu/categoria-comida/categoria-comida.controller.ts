import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CategoriaComidaService } from './categoria-comida.service';

@Controller('categorias-comida')
export class CategoriaComidaController {
  constructor(private readonly categoriaService: CategoriaComidaService) {}

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriaService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.categoriaService.create(data);
  }
}
