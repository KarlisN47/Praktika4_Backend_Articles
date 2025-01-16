# Project Overview

This project is a backend API designed to manage articles, now updated to use PostgreSQL as the database. The API is built with Node.js and Express.js and is configured to run locally using a PostgreSQL database instance.

## Features

- RESTful API endpoints for managing articles.
- PostgreSQL integration for persistent data storage.
- Environment-based configuration for secure and flexible deployment.

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- A terminal or IDE with a terminal.

### Local Setup

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/KarlisN47/Praktika4_Backend_Articles
    cd Praktika4_Backend_Articles
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Configure Environment Variables:**
    Create a `.env` file in the root directory and provide the following variables:
    ```plaintext
    PORT=3000
    PG_USER=your_postgres_user
    PG_HOST=localhost
    PG_DATABASE=your_database_name
    PG_PASSWORD=your_password
    PG_PORT=5432
    ```

4. **Set Up PostgreSQL Database:**

    - Log in to PostgreSQL:
        ```bash
        psql -U your_postgres_user
        ```

    - Create a new database:
        ```sql
        CREATE DATABASE your_database_name;
        ```

    - Create a sample articles table:
        ```sql
        CREATE TABLE articles (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ```

5. **Run the Server:**
    ```bash
    npm start
    ```

6. **Access the API:**
    The server will run on [http://localhost:3000](http://localhost:3000).

    Example endpoint:
    - `GET /api/articles` – Fetch all articles from the database.

## Development

### Running in Development Mode

For a better development experience, use `nodemon` to automatically restart the server when changes are made:
```bash
npm run dev
```

### Adding New Endpoints

- Define routes in the `routes` directory.
- Implement business logic in the `controllers` directory.
- Query the database using the `pool` object from PostgreSQL.

## Deployment

- Configure the `.env` file with production credentials.
- Ensure the PostgreSQL instance is accessible from the deployed environment.
- Use a process manager like `pm2` for running the application in production.

## Troubleshooting

- **Connection Errors:** Ensure the PostgreSQL service is running and the credentials in the `.env` file are correct.
- **Missing Tables:** Verify the database schema matches the expected table structure.