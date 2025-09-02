import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // your Remix dev server
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow cookies or authorization headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => console.log('running at port 3000'))
  .catch((error) => console.log(error));
