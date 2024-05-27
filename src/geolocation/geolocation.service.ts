import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

interface GeocodeResponse {
  features: Array<{
    geometry: {
      coordinates: [number, number];
    };
  }>;
}

@Injectable()
export class GeolocationService {
  private readonly accessToken = process.env.MAP_BOX_API_KEY;

  async forwardGeocoding(searchText: string): Promise<{ lat: number; lng: number }> {
    const encodedSearchText = encodeURIComponent(searchText);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedSearchText}.json?access_token=${this.accessToken}`;



    try {
      const response = await axios.get<GeocodeResponse>(url);

      if (response.data.features && response.data.features.length > 0) {
        const firstFeature = response.data.features[0];
        if (firstFeature.geometry && firstFeature.geometry.coordinates) {
          const [lng, lat] = firstFeature.geometry.coordinates;

          return { lat, lng };
        } else {
          throw new NotFoundException('Location data not found in the response');
        }
      } else {
        throw new NotFoundException('No features found for the given address');
      }
    } catch (error) {
      console.error('Error in forwardGeocoding:', error);
      throw error;
    }
  }
}
