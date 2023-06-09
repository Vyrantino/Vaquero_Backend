import { 
  Controller, 
  Get, 
  Redirect , 
  Post , 
  UseInterceptors, 
  UploadedFile, 
  ParseFilePipe, 
  FileTypeValidator, 
  MaxFileSizeValidator,
  Body 
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import axios from 'axios';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post()
  @UseInterceptors( FileInterceptor( 'image' ,  {
     storage: diskStorage({
        destination: function( res, file, cb ){
          cb( null, './uploadedImages' )

        },
        filename: function( res, file, cb ){
        
          cb( null , file.originalname )

        },
     }) 
  })) 
  async uploadFile( 
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp|)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 20 }),
        ],
      }),
    ) 
    file: Express.Multer.File ,
    @Body('alt') alt: string,
    @Body('gallery') gallery: string 
  ){
    console.log( file )
    const archivo = {
      alt: alt,
      name: file.filename ,
      path: file.path,
      type: file.mimetype,
      modified: Date.now(),
      gallery: gallery
    }
    try{
      const registrarArchivo = await axios.post( 'http://147.182.177.178:80/images', archivo  )
      //const registrarArchivo = await axios.post( 'http://localhost:3000/images', archivo  )
      console.log( registrarArchivo ) ;
      console.log( file.path );
    }
    catch( error ){
      console.error( error ) ;

    }
  }
  
}
