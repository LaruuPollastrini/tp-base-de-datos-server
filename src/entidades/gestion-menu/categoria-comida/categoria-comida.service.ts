import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoriaComidaDTO } from './categoria-comida.dto';
import { PlatoDTO } from '../plato/plato.dto';
import { Plato } from '../plato/plato.entity';
import { CategoriaComida } from './categoria-comida.entity';

@Injectable()
export class CategoriaComidaService {
  constructor(
    @InjectRepository(CategoriaComida)
    private readonly categoriaRepo: Repository<CategoriaComida>,
  ) {}

  // Nivel 1: Listar todas las categorías (solo info general)
  async findAll(): Promise<CategoriaComidaDTO[]> {
    const categorias = await this.categoriaRepo.find({
      relations: ['platos', 'platos.ingredientes'],
    });

    return categorias.map((categoria) => {
      const platosDTO: PlatoDTO[] = (categoria.platos || []).map(
        (plato: Plato) => ({
          id: plato.id,
          nombre: plato.nombre,
          ingredientes: plato.ingredientes.map((ing) => ({
            id: ing.id,
            nombre: ing.nombre,
            kcal: ing.kcal,
            cantidad: ing.cantidad,
          })),
          kcalTotal: plato.calcularKcalTotal(),
        }),
      );

      return {
        id: categoria.id,
        nombre: categoria.nombre,
        platos: platosDTO,
      };
    });
  }

  // Nivel 2 y 3: Obtener categoría con platos e ingredientes
  async findOne(id: number): Promise<CategoriaComidaDTO | null> {
    const categoria = await this.categoriaRepo.findOne({
      where: { id },
      relations: ['platos', 'platos.ingredientes'], //preguntar.
    });

    if (!categoria) return null;

    const platosDTO: PlatoDTO[] = (categoria.platos || []).map(
      (plato: Plato) => ({
        id: plato.id,
        nombre: plato.nombre,
        ingredientes: plato.ingredientes.map((ing) => ({
          id: ing.id,
          nombre: ing.nombre,
          kcal: ing.kcal,
          cantidad: ing.cantidad,
        })),
        kcalTotal: plato.calcularKcalTotal(),
      }),
    );

    return {
      id: categoria.id,
      nombre: categoria.nombre,
      platos: platosDTO,
    };
  }

  // Crear nueva categoría con platos e ingredientes
  async create(data: Partial<CategoriaComida>): Promise<CategoriaComidaDTO> {
    const nueva = this.categoriaRepo.create(data);
    const categoriaGuardada = await this.categoriaRepo.save(nueva);

    const platosDTO: PlatoDTO[] = (categoriaGuardada.platos || []).map(
      (plato: Plato) => ({
        id: plato.id,
        nombre: plato.nombre,
        ingredientes: plato.ingredientes.map((ing) => ({
          id: ing.id,
          nombre: ing.nombre,
          kcal: ing.kcal,
          cantidad: ing.cantidad,
        })),
        kcalTotal: plato.calcularKcalTotal(),
      }),
    );

    return {
      id: categoriaGuardada.id,
      nombre: categoriaGuardada.nombre,
      platos: platosDTO,
    };
  }
}
