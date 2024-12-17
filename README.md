# **Note App**

## **Quick Start**

### **Prerequisites**

Ensure the following tools are installed on your system:

- **Git**
- **Node.js**
- **npm (Node Package Manager)**
- **Docker & Docker Compose**

### **Steps to Set Up the Application**

1. **Clone the Repository**  
   Clone the repository to your local machine:
   ```bash
   git clone git@github.com:onkardev07/note-app.git
   cd note-app
   ```
2. **Set Up Environment Variables**

   - Navigate to the `docker` folder:
     ```bash
     cd docker
     ```
   - Create a `.env` file and add the following content:
     ```
     POSTGRES_USER=your-username
     POSTGRES_PASSWORD=your-password
     POSTGRES_DB=your-db-name
     ```

3. **Start PostgreSQL with Docker**  
   Run the following command to start the PostgreSQL container:
   ```bash
   docker-compose up -d --build
   ```
4. **Set Up the Backend**

   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Create a `.env` file and add the following content:
     ```
     DATABASE_URL="postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@localhost:5432/{POSTGRES_DB}"
     JWT_PASSWORD=your-jwt-secret
     ```
   - Install Node.js dependencies:
     ```bash
     npm install
     ```
   - Generate the Prisma client:
     ```bash
     npx prisma generate
     ```
   - Apply database migrations:
     ```bash
     npx prisma migrate dev
     ```
   - Compile TypeScript code:
     ```bash
     npx tsc -b
     ```
   - Start the backend server:
     ```bash
     node dist/index.js
     ```

5. **Set Up the Frontend**

   - Navigate to the `frontend` folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the development server:
     ```bash
     npm run dev
     ```

6. **Access the Application**  
   Open the application in your browser at:  
   [http://localhost:5173](http://localhost:5173)
   Deployed at:
   [http://15.206.178.231/]
