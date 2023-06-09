import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Articles } from './articles.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Articles])],
  providers: [ArticlesService],
  controllers: [ArticlesController],
})


export class ArticlesModule {

}


