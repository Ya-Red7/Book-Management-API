## **Book Management REST API**

A simple RESTful API built with Express.js to manage books, including functionalities to create, read, update, and delete book records. This API uses an in-memory data store, making it easy to get started without requiring a database.


### **Features**
- Get all books.
- Get a specific book by ID.
- Add a new book.
- Update an existing book.
- Delete a book.


### **Technologies Used**
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **Joi**: Data validation library for request payload validation.


### **Prerequisites**
- **Node.js**: Make sure you have Node.js installed. You can download it from [Node.js Official Website](https://nodejs.org/).

---

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/Ya-Red7/Book-Management-API.git
   ```
2. Navigate into the project directory:
   ```bash
   cd book-management-api
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

---

### **Usage**

1. Start the server:
   ```bash
   npm start
   ```
   or if you're using **nodemon**:
   ```bash
   npm run dev
   ```

2. The API will be available at:
   ```
   http://localhost:3000
   ```

---

### **API Endpoints**

#### **Base URL**: `/api/books`

| Method | Endpoint           | Description                   | Request Body Example                                                                                                   |
|--------|--------------------|-------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| GET    | `/`                | Get all books                | N/A                                                                                                                   |
| GET    | `/:id`             | Get a book by ID             | N/A                                                                                                                   |
| POST   | `/`                | Add a new book               | `{ "title": "Book Title", "author": "Author Name", "publishedYear": 2023, "genre": "Fiction", "available": true }`    |
| PUT    | `/:id`             | Update a book by ID          | `{ "title": "Updated Title", "author": "Updated Author", "publishedYear": 2023, "genre": "Updated Genre", "available": false }` |
| DELETE | `/:id`             | Delete a book by ID          | N/A                                                                                                                   |

---

### **Request Validation**
The API validates incoming requests using the **Joi** library. Below are the validation rules:

| Field           | Type    | Required | Constraints                              |
|------------------|---------|----------|------------------------------------------|
| `title`         | String  | Yes      | Must be 3-100 characters long            |
| `author`        | String  | Yes      | Must be 3-50 characters long             |
| `publishedYear` | Number  | Yes      | Must be a valid number                   |
| `genre`         | String  | Yes      | Must not be empty                        |
| `available`     | Boolean | Optional | Default is `false` if not provided       |

---

