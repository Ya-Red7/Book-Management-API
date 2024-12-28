## **Book Management REST API**

A simple RESTful API built with **Express.js** to manage books, including functionalities to create, read, update, and delete book records. This API uses **MongoDB** as its database, offering persistent storage for book data.

### **Features**
- Get all books.
- Get a specific book by ID.
- Add a new book.
- Update an existing book.
- Delete a book.

### **Technologies Used**
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database used for persistent data storage.
- **Joi**: Data validation library for request payload validation.

### **Prerequisites**
- **Node.js**: Make sure you have Node.js installed. You can download it from [Node.js Official Website](https://nodejs.org/).
- **MongoDB**: Make sure you have MongoDB installed locally or use a cloud MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
  - If you're using MongoDB locally, ensure the MongoDB server is running on `localhost:27017`.
  
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

4. **Configure MongoDB URI (Optional)**:  
   If you're using **MongoDB Atlas** or a remote database, update the `URI` in the `.env` file (create one if it doesn't exist):
   ```bash
   URI=mongodb://localhost:27017
   ```
   This URI connects to your MongoDB database. Replace the default `localhost` URL with the URI of your MongoDB Atlas or any remote MongoDB service.

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
   ```bash
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

### **MongoDB Integration**

This API uses **MongoDB** for storing book data persistently.

- **Database Name**: `booksDB`
- **Collection Name**: `books`
- **Counter Collection**: A separate collection `counter` is used to manage and generate incremental IDs for books.

**MongoDB URI**: The default URI connects to a local MongoDB instance (`mongodb://localhost:27017`). If you're using MongoDB Atlas or a remote MongoDB service, modify the `URI` in the `.env` file.

---

### **MongoDB Setup**

- **MongoDB**: You need MongoDB running either locally or on a cloud instance like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). 
- **Counter Collection**: The API uses a `counter` collection to manage incremental book IDs. The counter collection stores a sequence for generating unique IDs for books. Here’s an example document:
  ```json
  {
    "_id": "booksId",
    "seq": 20
  }
  ```
