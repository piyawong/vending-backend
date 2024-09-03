// import { NestFactory } from '@nestjs/core';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { AppModule } from './app.module';
// import { IoAdapter } from '@nestjs/platform-socket.io';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors();
//   app.useWebSocketAdapter(new IoAdapter(app));

//   const config = new DocumentBuilder()
//     .setTitle('Vending Machine API')
//     .setDescription('API for vending machine detection records')
//     .setVersion('1.0')
//     .addTag('detection-records')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   await app.listen(8089);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));

  const uploadPath = path.join(__dirname, '..', 'uploads');
  console.log('Serving static files from:', uploadPath);
  app.useStaticAssets(uploadPath, {
    prefix: '/uploads/',
  });

  await app.listen(8089);
}
bootstrap();
