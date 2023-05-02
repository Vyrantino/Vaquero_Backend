import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule , DocumentBuilder } from '@nestjs/swagger' ;
import * as cookieParser from 'cookie-parser' ; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors() ;
  // app.use( cookieParser() ) ; 

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MAQROM Construcciones')
    .setDescription('MAQROM API')
    .setVersion('1.0')
    .addTag('MAQROM')
    .addTag( 'Cards' )
    .addTag( 'Carousels' )
    .addTag( 'Images' )
    .addTag( 'Papers' )
    .addTag( 'Videos' )
    .build() ;

  const document = SwaggerModule.createDocument( app, config ) ;
  SwaggerModule.setup( 'api' , app , document ) ;

  await app.listen(3000);
  NestFactory.create(AppModule, { abortOnError: false }) ;
}
bootstrap();
