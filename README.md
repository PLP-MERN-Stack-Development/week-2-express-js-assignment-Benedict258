# Express.js Product API

A RESTful API for managing products, built with **Express.js** and **MongoDB**.

---

## 🚀 Features

- Full CRUD operations on `products`
- Middleware for logging, validation, and API key authentication
- Error handling with custom error classes
- Filter, search, and paginate products
- Category-based statistics endpoint
- Swagger-ready structure for future documentation

---

## 🧠 Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- uuid
- body-parser
- nodemon (for development)

---

## 📁 Project Structure

.
├── server.js
├── models/
│ └── Product.js
├── routes/
│ └── products.js
├── middleware/
│ ├── auth.js
│ ├── logger.js
│ └── errorHandler.js
├── utils/
│ └── errors.js
├── .env.example
├── README.md

yaml
Copy
Edit

---

## 🔧 Setup Instructions

1. **Clone your GitHub repo**
2. **Install dependencies**

```bash
npm install
Create a .env file based on .env.example

env
Copy
Edit
MONGO_URI=your_mongodb_uri
PORT=3000
API_KEY=f3d8a9b7-245e-4122-a82d-d65b4fe947ab
Start the server

bash
Copy
Edit
npm run dev
🧪 API Endpoints
📌 Base URL
bash
Copy
Edit
http://localhost:3000/api/products
📘 CRUD Endpoints
Method	Endpoint	Description	Auth
GET	/api/products	List all products	❌
GET	/api/products/:id	Get product by ID	❌
POST	/api/products	Create a product	✅
PUT	/api/products/:id	Update a product	✅
DELETE	/api/products/:id	Delete a product	✅

✅ Auth Required: Add header x-api-key: YOUR_API_KEY

🔍 Advanced Queries
Query Param	Example	Purpose
search	/api/products?search=chair	Search by name
category	/api/products?category=home	Filter by category
page	/api/products?page=2	Paginate (page number)
limit	/api/products?limit=3	Paginate (results per page)

📊 Stats Endpoint
swift
Copy
Edit
GET /api/products/stats/categories
Returns total product count grouped by category.

🧪 Example Requests (Thunder Client or Postman)
Create Product (POST)
Headers: Content-Type: application/json, x-api-key: YOUR_API_KEY

Body:

json
Copy
Edit
{
  "name": "Gaming Chair",
  "description": "Comfortable ergonomic chair",
  "price": 220,
  "category": "furniture",
  "inStock": true
}
