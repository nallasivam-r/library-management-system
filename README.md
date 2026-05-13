# Library Management System

## Technologies Used

### Backend
- Java
- Spring Boot
- MySQL
- Maven

### Frontend
- Angular
- TypeScript
- HTML
- CSS

---

# Features

## Categories
- Add Category
- Edit Category
- Delete Category
- View Categories

## Books
- Add Book
- Edit Book
- Delete Book
- View Books
- Search Books
- Filter Books by Category

---

# Backend Setup

1. Open backend project in Eclipse
2. Configure MySQL in application.properties
3. Run:

mvn spring-boot:run

Backend runs on:
http://localhost:8080

---

# Frontend Setup

1. Open frontend project in VS Code
2. Install dependencies:

npm install

3. Run Angular:

ng serve

Frontend runs on:
http://localhost:4200

---

# Database Setup

Create database in MySQL:

CREATE DATABASE library_db;

---

# API Endpoints

## Categories
- GET /categories
- POST /categories
- PUT /categories/{id}
- DELETE /categories/{id}

## Books
- GET /books
- POST /books
- PUT /books/{id}
- DELETE /books/{id}