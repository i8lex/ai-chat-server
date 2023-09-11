// ...
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    //httpsOptions: httpsOptions,
  });
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useWebSocketAdapter(new WsAdapter(app));

  const httpServer = app.getHttpServer();
  const io = new IoAdapter(httpServer);

  app.useWebSocketAdapter(io);

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then();
