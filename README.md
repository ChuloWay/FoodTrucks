# Food Trucks Service

This service provides information about food trucks available near a specific location. It utilizes data from DataSF's Food Trucks dataset to display the types of food trucks found in the vicinity of the user's specified location.

## Features

- **Geolocation**: The service allows users to input an address, which is then geocoded to obtain latitude and longitude coordinates.
  
- **Search**: Users can search for food trucks near their specified location within a certain radius.

## Data Source

The data used in this service is sourced from DataSF's Food Trucks dataset, providing detailed information about each food truck, including its name, type, address, and geographical coordinates.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
  
- **Axios**: A promise-based HTTP client for making requests to external APIs.

## Getting Started

To run the service locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies using `npm install`.
4. Set up your environment variables, including the Mapbox API key.
5. Start the server using `npm run start:dev`.

## Usage

- **Geocoding**: Use the `/foodtruck/geocode` endpoint to geocode an address and obtain its latitude and longitude coordinates.
  
- **Search**: Utilize the `/foodtruck/nearby` endpoint to search for food trucks near a specified location within a certain radius.

## API Documentation

The Swagger API documentation is available at `/api`.

## License

This project is licensed under the [MIT License](LICENSE).
