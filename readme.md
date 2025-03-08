# E-commerce API

This is a backend API for an e-commerce platform built with **Next.js** ,**Nest.js**, **Prisma**, and **Swagger** for API documentation. The API provides functionalities for managing carts, products, orders, users, and payment processing.

### What’s new:

1. **Frontend (In Progress)** - Added a section that explains the frontend (built with Next.js) and that it's still under development. It gives an overview of upcoming features.
2. **Access Swagger API Documentation** - Added a section to check the Swagger documentation URL to explore the API.

## Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Nikhil-Pulluri/ecommerce
   cd ecommerce

   ```

2. **Setup the Server**
   set up the .env file using the example .env in the server

````bash
cd server
npm i
npm run start:dev

3. **Setup the client**
Open new terminal in the root directory
```bash
cd client
npm i
npm run dev

````

## Features

### 1. **Cart Management**

- Create a cart
- Add items to cart
- Update item quantity in the cart
- Get cart details by ID
- Calculate cart total
- Clear cart

### 2. **Order Management**

- Create an order
- List orders by user
- Update order quantity
- Calculate order total
- Checkout order
- Cancel order

### 3. **Product Management**

- Create a new product
- List products by category
- Update product details
- Search products by name and price range
- Search products by category
- Delete a product

### 4. **User Management**

- Create a new user
- Retrieve user details by unique identifier
- Update user details
- Delete a user

### 5. **Payment Processing**

- Create a payment order
- Verify payment details

## Technologies Used

- **Next.js** - FrontEnd Framework for building User Interface
- **Nest.js** - A Node.js framework for building scalable and maintainable server-side applications.
- **Prisma** - An ORM (Object Relational Mapping) used to interact with the database.
- **Swagger** - A framework for API documentation that is used for automatic generation and viewing of the API documentation.
- **MongoDB** - The database for storing user, order, cart, and product information.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Compass (latest version works)

### Swagger API Documentation

To explore the API, you can access the **Swagger API Documentation**. It provides detailed information about each endpoint, request parameters, and response types. This makes it easy to interact with the API and test various endpoints.

1. **Access the Swagger Docs:**

   - Open the following URL in your browser:  
     [Swagger API Documentation](https://ecommerce-2e12.onrender.com/api)
   - The Swagger UI will appear, allowing you to explore and test all the available API endpoints.

2. **Features:**

   - **Interactive Documentation:** You can make test requests directly from the Swagger UI.
   - **API Endpoints:** Detailed description of all the endpoints for Cart, Order, Product, User, and Payment.
   - **Request/Response Details:** Information on request bodies, query parameters, and expected responses.

3. **Authentication:**
   - Some endpoints may require authentication (e.g., creating an order, updating user details). Make sure to check the documentation for authentication details, such as using **JWT tokens**.

Feel free to explore and interact with the API using the Swagger UI to better understand how each endpoint works.
