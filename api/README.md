# Sugar Prices API

This is an Express-based REST API that provides sugar price data for various countries. The API allows fetching the latest and historical sugar prices, either globally or for a specific country.

## Features

- **Latest Sugar Prices for All Countries**
- **Latest Sugar Prices for a Given Country**
- **Historical Sugar Prices for All Countries (Grouped by Day)**
- **Historical Sugar Prices for a Given Country (Grouped by Day)**

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL/MySQL](https://www.postgresql.org/) or any supported database

### Clone the Repository

```sh
git clone https://github.com/yourusername/sugar-api.git
cd sugar-api
```

### Install Dependencies

```sh
npm install
```

### Configure the Database

Modify the `db.js` file to set up your database connection:

```js
export const AppDataSource = new DataSource({
    type: "postgres", // Change to your database type
    host: "localhost",
    port: 5432, // Change according to your DB setup
    username: "your_username",
    password: "your_password",
    database: "your_database_name",
    entities: [Sugar],
    synchronize: true,
});
```

### Run the Server

```sh
npm start
```

The API will be available at `http://localhost:1337/`

## API Endpoints

### 1. Latest Sugar Prices for All Countries

- **Endpoint:** `GET /allSugar`
- **Description:** Fetches the latest sugar prices for all countries.
- **Response Example:**

```json
[
    {
        "productName": "White Sugar",
        "size": "1kg",
        "price": 50,
        "country": "Kenya",
        "timestamp": "2024-02-01T10:00:00.000Z"
    }
]
```

### 2. Latest Sugar Prices for a Given Country

- **Endpoint:** `GET /sugar/:country`
- **Description:** Fetches the latest sugar prices for a specific country.
- **Example Request:**
  ```sh
  GET /sugar/Kenya
  ```

### 3. Historical Sugar Prices for All Countries (Grouped by Day)

- **Endpoint:** `GET /historicalAll`
- **Description:** Fetches historical sugar prices for all countries, grouped by day.

### 4. Historical Sugar Prices for a Given Country (Grouped by Day)

- **Endpoint:** `GET /historical/:country`
- **Description:** Fetches historical sugar prices for a given country, grouped by day.
- **Example Request:**
  ```sh
  GET /historical/Kenya
  ```

## Technologies Used

- **Node.js** - Server runtime
- **Express.js** - Backend framework
- **TypeORM** - ORM for database operations
- **PostgreSQL/MySQL** - Database
- **Cors** - Middleware for handling CORS

## License

This project is licensed under the MIT License.

## Author

- **Alvin Mugo** - Developer of the API