import { Module } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';


@Module({
  controllers: [],
  providers: [GeolocationService],
  exports: [GeolocationService],
})
export class GeolocationModule {}
