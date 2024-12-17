Quick Start

Prerequisites

Make sure you have the following installed on your machine:

Git

Node.js

npm (Node Package Manager)

Docker & Docker Compose

Cloning the Repository

Clone the repository to your local machine:

git clone git@github.com:onkardev07/note-app.git
cd note-app

Set Up Environment Variables

1. Configure PostgreSQL Environment

Navigate to the docker folder and create a .env file:

cd docker

Create a file named .env and add the following content:

POSTGRES_USER=your-username
POSTGRES_PASSWORD=your-password
POSTGRES_DB=your-db-name

2. Start PostgreSQL with Docker

Run the following command to start PostgreSQL using Docker Compose:

docker-compose up -d --build

3. Backend Environment Setup

Navigate to the backend folder:

cd backend

Create a file named .env and add the following content:

DATABASE_URL="postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@localhost:5432/{POSTGRES_DB}"
JWT_PASSWORD=your-jwt-secret

4. Install Dependencies & Set Up Prisma

Install the required Node modules:

npm install

If the Prisma client is not generated, run:

npx prisma generate

If the database migrations are not applied, run:

npx prisma migrate dev

5. Compile TypeScript

If TypeScript is not installed globally, install it:

npm install -g typescript

Compile the TypeScript code:

npx tsc -b

6. Start the Backend Server

Run the backend server:

node dist/index.js

Start the Frontend

Navigate to the frontend folder:

cd frontend

Install the dependencies:

npm install

Run the development server:

npm run dev

Access the Application

Once both backend and frontend are running, you can access the application in your browser:

http://localhost:5173

Notes:

Replace your-username, your-password, and your-db-name with your actual PostgreSQL credentials.

Replace your-jwt-secret with a secure JWT password for authentication.

Ensure Docker is running when starting the PostgreSQL container.

Common Issues

If Prisma throws an error, check the .env file and ensure your database is running.

If TypeScript compilation fails, ensure TypeScript is installed globally or locally.

Deployed at:http://15.206.178.231/
