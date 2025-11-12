import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { ErrorHandlerFilter } from 'src/Infrastructure/Filters/ErrorHandler.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );

  app.use(cookieParser(process.env.COOKIE_NAME));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  app.useGlobalFilters(new ErrorHandlerFilter());

  await app.listen(3000);
}
void bootstrap();
