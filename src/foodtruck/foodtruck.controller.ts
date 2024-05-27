import { Controller, Get, Query } from '@nestjs/common';
import { FoodtruckService } from './foodtruck.service';
import { GeolocationService } from 'src/geolocation/geolocation.service';

@Controller('foodtruck')
export class FoodtruckController {
  constructor(
    private readonly foodtruckService: FoodtruckService,
    private readonly geolocationService: GeolocationService
  ) {}

  @Get('nearby')
  async getFoodTrucksNearby(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('radius') radius: string
  ) {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const searchRadius = parseFloat(radius) || 1; // default radius 1km
    return this.foodtruckService.getFoodTrucksNearLocation(latitude, longitude, searchRadius);
  }

  @Get('geocode')
  async geocodeAddress(@Query('address') address: string) {
    return this.geolocationService.forwardGeocoding(address);
  }
}
