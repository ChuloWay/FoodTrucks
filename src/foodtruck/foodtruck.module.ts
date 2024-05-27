import { Module } from '@nestjs/common';
import { FoodtruckService } from './foodtruck.service';
import { FoodtruckController } from './foodtruck.controller';
import { GeolocationModule } from 'src/geolocation/geolocation.module';

@Module({
  imports: [GeolocationModule],
  controllers: [FoodtruckController],
  providers: [FoodtruckService],
})
export class FoodtruckModule {}
