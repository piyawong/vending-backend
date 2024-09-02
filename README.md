## How to Run

1. **Install dependencies:**

   ```bash
   yarn install
   ```

2. **Start the development server:**

   ```bash
   yarn run start:dev
   ```

   This will start the server in watch mode, automatically restarting on file changes.

3. **Build for production:**

   ```bash
   yarn run build
   ```

4. **Run in production mode:**

   ```bash
   yarn run start:prod
   ```

5. **Run tests:**

   ```bash
   # Unit tests
   yarn run test

   # E2E tests
   yarn run test:e2e

   # Test coverage
   yarn run test:cov
   ```

## Docker Setup

To run the application using Docker:

1. Build the Docker image:

   ```bash
   docker build -t vending-backend .
   ```

2. Run the Docker container:

   ```bash
   docker-compose up
   ```

This will start both the NestJS application and a PostgreSQL database.

## API Endpoints

- `GET /books`: Fetch all books
- `GET /books/:id`: Fetch a specific book
- `POST /books`: Create a new book
- `PUT /books/:id`: Update a book
- `DELETE /books/:id`: Delete a book

## DetectionRecord API Endpoints

- `GET /detection-records`: Fetch all detection records
- `GET /detection-records/:id`: Fetch a specific detection record
- `POST /detection-records`: Create a new detection record
- `PUT /detection-records/:id`: Update a detection record
- `DELETE /detection-records/:id`: Delete a detection record

For more details on the DetectionRecord API, please refer to the controller files in the `src/detectionRecord` directory.

For more details on the API, please refer to the controller files in the `src/book` directory.

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.
