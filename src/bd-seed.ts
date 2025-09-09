import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();
async function seed(dataSource: DataSource) {
    await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  console.log("🌱 Starting seed...");

  await queryRunner.startTransaction();
  try {
    // 🔹 Limpiar tablas en orden correcto
    await queryRunner.query("SET FOREIGN_KEY_CHECKS = 0");
    await queryRunner.query("TRUNCATE TABLE platos_ingredientes");
    await queryRunner.query("TRUNCATE TABLE platos");
    await queryRunner.query("TRUNCATE TABLE ingredientes");
    await queryRunner.query("TRUNCATE TABLE categorias_comida");
    await queryRunner.query("SET FOREIGN_KEY_CHECKS = 1");

    // 🔹 Categorías
    await queryRunner.query(`
      INSERT INTO categorias_comida (id, nombre) VALUES
      (1, 'Desayuno'),
      (2, 'Almuerzo'),
      (3, 'Cena'),
      (4, 'Snacks');
    `);

    // 🔹 Platos
    await queryRunner.query(`
      INSERT INTO platos (id, nombre, categoriaId) VALUES
      (1, 'Omelette', 1),
      (2, 'Tostadas con palta', 1),
      (3, 'Ensalada César', 2),
      (4, 'Pollo al horno', 3),
      (5, 'Yogur con frutas', 4);
    `);

    // 🔹 Ingredientes
    await queryRunner.query(`
      INSERT INTO ingredientes (id, nombre, kcal) VALUES
      (1, 'Huevos', 155),
      (2, 'Aceite de oliva', 120),
      (3, 'Palta', 160),
      (4, 'Pan integral', 90),
      (5, 'Lechuga', 15),
      (6, 'Pollo', 200),
      (7, 'Queso parmesano', 110),
      (8, 'Yogur', 100),
      (9, 'Frutilla', 30),
      (10, 'Banana', 89);
    `);

    // 🔹 Relaciones plato_ingredientes
    await queryRunner.query(`
      INSERT INTO platos_ingredientes (platoId, ingredienteId) VALUES
      (1, 1), -- Omelette -> Huevos
      (1, 2), -- Omelette -> Aceite
      (2, 3), -- Tostadas con palta -> Palta
      (2, 4), -- Tostadas con palta -> Pan
      (3, 5), -- Ensalada César -> Lechuga
      (3, 6), -- Ensalada César -> Pollo
      (3, 7), -- Ensalada César -> Queso parmesano
      (4, 6), -- Pollo al horno -> Pollo
      (4, 2), -- Pollo al horno -> Aceite
      (5, 8), -- Yogur con frutas -> Yogur
      (5, 9), -- Yogur con frutas -> Frutilla
      (5, 10); -- Yogur con frutas -> Banana
    `);

    await queryRunner.commitTransaction();
    console.log("✅ Seed completed!");
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("❌ Seed failed:", error);
  } finally {
    await queryRunner.release();
  }
}

seed(
    new DataSource({
      type: "mysql",
      host: process.env.MYSQLHOST,
      port: parseInt(process.env.MYSQLPORT ?? '') || 3306,
      username: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE
    })
).finally(() => {
  console.log("🌱 Seed process finished.");
  process.exit(0);
});