import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const sequelize = app.get(Sequelize);
  await sequelize.sync({ alter: true });

  app.enableCors({
    origin: 'http://localhost:3100',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3100);

  console.log('App is running on: http://localhost:3100');
}
bootstrap();
