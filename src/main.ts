import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
      session({
          secret: '',
          resave: false,
          saveUninitialized: false,
      })
  );


  // console.log(join(__dirname, '../src', 'views'));
  // app.setBaseViewsDir(join(__dirname, '../src', 'views'));
  // app.setViewEngine('html');
  const express = require('express');
  app.use(express.static(join(__dirname, 'public')));
  app.set('views', join(__dirname, '../src', 'views'));
  app.set('view engine', 'ejs');


  await app.listen(3000);
}
bootstrap();
