import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

export interface FoodTruck {
  objectid: string;
  applicant: string;
  facilitytype: string;
  address: string;
  latitude: string;
  longitude: string;
}

@Injectable()
export class FoodtruckService {
  private readonly dataUrl = 'https://data.sfgov.org/resource/rqzj-sfat.json';

  async getFoodTrucksNearLocation(
    lat: number,
    lng: number,
    radius: number,
  ): Promise<Partial<FoodTruck>[]> {
    try {
      const response = await axios.get<FoodTruck[]>(this.dataUrl);
      const foodTrucks = response.data;

      // Calculate distance and filter food trucks within the given radius
      const filteredFoodTrucks = foodTrucks.filter((truck) => {
        const truckLat = parseFloat(truck.latitude);
        const truckLng = parseFloat(truck.longitude);
        if (isNaN(truckLat) || isNaN(truckLng)) return false;

        const distance = this.calculateDistance(lat, lng, truckLat, truckLng);
        return distance <= radius;
      });

      // Return only necessary fields
      return filteredFoodTrucks.map((truck) => ({
        applicant: truck.applicant,
        facilitytype: truck.facilitytype,
        address: truck.address,
        latitude: truck.latitude,
        longitude: truck.longitude,
      }));
    } catch (error) {
      console.error('Error fetching food trucks:', error);
      throw new NotFoundException('Could not fetch food trucks');
    }
  }

  private calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const toRadians = (degree: number) => degree * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
