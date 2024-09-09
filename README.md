# Flights Booking Service

## Overview
The Flights Booking Service is responsible for handling flight bookings. It ensures transaction isolation using database-level locks and supports idempotent payments to prevent duplicate charges. The service interacts with the Flights Service to verify flight details and uses RabbitMQ to send messages to a notification queue for ticketing information.

## Features
- Booking Management: Handles the creation, retrieval, and cancellation of flight bookings.
- Transaction Isolation: Utilizes database-level locks to ensure transaction consistency and prevent conflicts.
- Idempotent Payments: Supports idempotent payment processing to avoid duplicate charges for the same booking.
- Integration with Flights Service: Interacts with the Flights Service to verify flight availability and details.
- RabbitMQ Integration: Sends messages to a RabbitMQ queue for ticketing notifications, ensuring asynchronous processing and real-time updates.

## High Level Design
![High Level Design](https://github.com/logeshsuresh/Flights-Booking-Service/blob/master/Flights-HLD.png)

## Setup
Follow these steps to set up the project locally:

#### 1. Clone the Repository

```
git clone https://github.com/logeshsuresh/Flights-Booking-Service.git
```

#### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```
cd Flights-Booking-Service
npm install
```

#### 4. Create .env File

In the root directory, create a .env file and add the required environment variables:
```
PORT=4000
FLIGHT_SERVICE='http://flights_service:3000'
```
Make sure you have already setup API-Gateway & Flights-Service.

#### 4. Initialize Sequelize

Navigate to src/config and create a config.json file with the following content:
```
{
  "development": {
    "username": "root",
    "password": "null",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
Replace username, password, and database with your actual database credentials.

#### 5. Run the following command to apply database migrations:

```
npx sequelize db:migrate
```
Migrations help manage changes to the database schema over time.

## Folder Structure
The src folder contains all the source code for the project:

- `config/`: Contains configurations for libraries and modules.
- `controllers/`: Handles incoming requests, passes data to the business layer, and structures the API responses.
- `middlewares/`: Intercepts requests for tasks such as validation and authentication.
- `migrations/`: Contains migration files that track changes to the database schema.
- `models/`: Defines the database schema and represents tables in the database.
- `repositories/`: Contains logic for interacting with the database, including queries and ORM operations.
- `routes/`: Registers routes and their corresponding middleware and controllers.
- `seeders/`: Stores seed classes for populating the database with initial data.
- `services/`: Contains business logic and interacts with repositories to handle database operations.
- `utils/`: Provides helper methods and utility functions.

## Usage
To start the Booking Service, use:

```
npm start
```
Ensure that all necessary environment variables and configurations are set before starting the service.

