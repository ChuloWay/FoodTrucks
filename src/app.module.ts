import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeolocationModule } from './geolocation/geolocation.module';
import { FoodtruckModule } from './foodtruck/foodtruck.module';

@Module({
  imports: [ ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }), GeolocationModule, FoodtruckModule],


  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
