## ****Backend API Overview for STC Store eCommerce Platform****

## 1. Introduction
The backend API for STC Store eCommerce is built using **Node.js** with **Express.js** as the web framework. It follows a modular and scalable architecture to handle various functionalities, including product management, user authentication, order processing, and payment handling. The backend interacts with a **MongoDB** database and utilizes **Redis** for caching to enhance performance.

## 2. Technology Stack
- **Node.js**: Runtime environment for executing JavaScript on the server.
- **Express.js**: Lightweight and flexible web framework.
- **MongoDB**: NoSQL database for scalable and efficient data storage.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Redis**: In-memory caching for optimized API performance.
- **Cloudflare**: DNS management and security enhancements.
- **Nodemailer**: Email handling for notifications and authentication.
- **JWT (JSON Web Token)**: Secure authentication and authorization mechanism.
- **Redux**: State management for frontend integration.

## 3. API Functionalities

### a) Authentication & Authorization
- **User Registration:** Secure account creation with email verification.
- **Login & Logout:** JWT-based authentication.
- **Role-based Access Control (RBAC):** User roles (Admin, Seller, Customer) for access control.
- **Password Reset & OTP Verification:** Secure recovery and authentication.

### b) Product Management
- **CRUD Operations:** Create, Read, Update, Delete products.
- **Search & Filters:** Optimized product search with Redux and debouncing.
- **Image Uploads:** Cloud-based storage integration.
- **Categories & Tags:** Organized product classification.

### c) Order Processing
- **Cart Management:** Add/remove items, apply discounts, calculate totals.
- **Checkout & Payment Gateway:** Integration with Stripe/Razorpay.
- **Order Tracking:** Real-time order status updates.

### d) User Management
- **Profile Management:** Edit user details and preferences.
- **Wishlist & Order History:** Save favorite products and view past orders.
- **Customer Support:** Ticketing system and chat support.

### e) Admin Dashboard
- **User & Role Management:** Assign and modify user roles.
- **Product Approval System:** Sellers submit products for admin approval.
- **Sales Analytics & Reports:** Dashboard with revenue insights.
- **Inventory Management:** Stock level monitoring.

### f) Notifications & Emails
- **Transactional Emails:** Order confirmations, password resets.
- **Push Notifications:** Real-time alerts for orders, promotions.
- **Admin Alerts:** System errors, low stock notifications.

## 4. Performance & Security Enhancements
- **API Rate Limiting:** Prevent DDoS attacks.
- **Data Encryption:** Secure sensitive information.
- **Caching with Redis:** Reduce database load.
- **Cloudflare WAF:** Protect against malicious traffic.
- **CI/CD Pipeline:** Automated deployments for efficiency.
- **Ubuntu Server Optimization:** Load balancing, process management.

## 5. Deployment Strategy
- **Frontend:** Deployed at `stcstore.sayanthecoder.me`.
- **Backend:** Hosted at `api.stcstore.sayanthecoder.me`.
- **CI/CD Integration:** Automate build and deployment processes.
- **Monitoring & Logging:** Implement error tracking and logging mechanisms.

## 6. Future Enhancements
- **AI-based Product Recommendations.**
- **GraphQL API Support.**
- **Microservices Architecture.**
- **Multi-language Support.**

This structured API design ensures scalability, security, and seamless integration with the frontend, providing an efficient eCommerce experience for STC Store users.



## Backend Code Configuration Summary

#### 1. **Server Configuration**
- **Port**: `3000`

#### 2. **Razorpay Configuration**
- **Key ID**: `your_razorpay_key_id_here`
- **Key Secret**: `your_razorpay_key_secret_here`

#### 3. **Nodemailer Configuration**
- **SMTP Password**: `your_smtp_password_here`
- **SMTP Username**: `your_smtp_username_here`
- **Email From**: `your_email_from_address_here`
- **SMTP Host**: `your_smtp_host_here`
- **SMTP Port**: `your_smtp_port_here`

#### 4. **JWT Configuration**
- **Refresh Token Secret**: `your_refresh_token_secret_here`
- **Refresh Token Expiry**: `7d`
- **Access Token Secret**: `your_access_token_secret_here`
- **Access Token Expiry**: `1d`

#### 5. **Cloudinary Configuration**
- **Cloud Name**: `your_cloudinary_cloud_name_here`
- **API Key**: `your_cloudinary_api_key_here`
- **API Secret**: `your_cloudinary_api_secret_here`

#### 6. **MongoDB Configuration**
- **Database Name**: `your_database_name_here`
- **Database URL**: `your_database_url_here`

#### 7. **Firebase Admin SDK Configuration**
- **Service Account Key**: Located at `./src/utils/serviceAccountKey.js` `JSON --> JS File Format Change`
  - This is a JSON file downloaded from the Firebase console.

#### 8. **Redis Configuration**
- **Redis Usage**:
  Redis is configured as an in-memory caching mechanism for server-side performance optimization.

##### Steps to Set Up Redis:
1. Install Docker and run the following commands to start a Redis server locally:
   - **Download Redis image**: `docker pull redis`
   - **Start Redis container**: `docker run --name redis -p 6379:6379 -d redis`

2. **Connection Code Snippet**:
   ```javascript
   const redisClient = redis.createClient({ host: 'localhost', port: 6379 });
   ```

3. **Relevant File Location**:
   `./src/db/Redis.db.js`

#### 9. **Next Steps**
1. Run the following command to install all necessary dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Alternatively, start the production server:
   ```bash
   npm run start
   ```
---
---
# Backend API Summary
### Authentication API Summary

## User Access Api

#### 1. **Register User** (`POST /api/v1/users/register`)
This API registers a new user.
- **Parameters** (in `req.body`):
  - `varifyby`: Verification method (`email` or `google.com`).
  - `fullName`: Full name of the user (required for email verification).
  - `username`: Desired username (required for email verification).
  - `email`: User's email address.
  - `password`: User's password (required for email verification).
  - `userdata`: Google token (required for Google verification).
- **Behavior**:
  - For `email`:
    - Validates input fields.
    - Checks if the email is already in use.
    - Sends an OTP for email verification.
  - For `google.com`:
    - Verifies the Google token.
    - Creates a user and generates access/refresh tokens.
    - Sends a welcome email asynchronously.

---

#### 2. **Verify Email** (`POST /api/v1/users/verify-email`)
This API verifies the user's email using the OTP.
- **Parameters** (in `req.body`):
  - `email`: Email address.
  - `otp`: OTP sent to the user's email.
- **Behavior**:
  - Validates the OTP and updates the user as verified.
  - Generates access and refresh tokens.
  - Sends a welcome email asynchronously.

---

#### 3. **Resend OTP** (`POST /api/v1/users/resend-otp`)
This API resends a new OTP to the user's email.
- **Parameters** (in `req.body`):
  - `email`: Email address.
- **Behavior**:
  - Generates a new OTP and updates the user record.
  - Sends the new OTP asynchronously.

---

#### 4. **Forgot Password** (`POST /api/v1/users/forgot-password`)
This API resets the user's password and sends the new password via email.
- **Parameters** (in `req.body`):
  - `email`: Email address.
- **Behavior**:
  - Generates a new password and updates the user record.
  - Sends the new password to the user's email.

---

#### 5. **Login User** (`POST /api/v1/users/login`)
This API logs in a user and generates access/refresh tokens.
- **Parameters** (in `req.body`):
  - `varifyby`: Verification method (`email` or `google.com`).
  - `email`: Email address (required for `email` verification).
  - `password`: User's password (required for `email` verification).
  - `userdata`: Google token (required for `google.com` verification).
- **Behavior**:
  - For `email`:
    - Validates credentials and checks email verification status.
  - For `google.com`:
    - Verifies the Google token and logs in the user.
  - Generates and sets access/refresh tokens in cookies.

---

#### 6. **Logout User** (`GET /api/v1/users/logout`)
This API logs out the user by clearing the refresh token and cookies.
- **Behavior**:
  - Removes the refresh token from the database.
  - Clears access and refresh tokens from cookies.

---

---

## Summary of Product APIs

### 1. Add Product to Database and Upload Images

**Endpoint:** `POST /api/v1/products/product-upload`

- **Purpose:** Create a new product and upload associated images to Cloudinary.
- **Request Body:**
  - `name`, `title`, `description`, `details`, `features`, `livePreview`, `price`, `category`, `tags`, `stock`
  - Files: `productImage` (Array of images, each under 2MB, image files only)
- **Response:**
  - Success: `201` with product details.
  - Errors: Validation or upload failures (e.g., invalid file type or size).

### 2. Update Product in Database

**Endpoint:** `PUT /api/v1/products/product-update/:id`

- **Purpose:** Update details of an existing product.
- **Request Parameters:**
  - `id` (Product ID)
- **Request Body:**
  - Fields to update (`name`, `title`, `description`, etc.)
  - Files: Optional `productImage`
- **Response:**
  - Success: `200` with updated product details.
  - Errors: Product not found or image upload issues.

### 3. Delete Product from Database

**Endpoint:** `DELETE /api/v1/products/product-delete/:id`

- **Purpose:** Remove a product permanently from the database.
- **Request Parameters:**
  - `id` (Product ID)
- **Response:**
  - Success: `200` with confirmation message.
  - Errors: Product not found.

### 4. Product Like/wishlist

**Endpoint:** `PUT /api/v1/products/product-like/:id`

- **Purpose:** Toggle like/unlike status for a product.
- **Request Parameters:**
  - `id` (Product ID)
- **Behavior:**
  - Adds/removes product ID in user's wishlist.
  - Updates product's like count and list of users who liked it.
- **Response:**
  - Success: `200` with like confirmation.
  - Errors: Product or user not found.

### 5. Post Product Review and Rating

**Endpoint:** `PUT /api/v1/products/product-review/:id`

- **Purpose:** Submit a review and rating for a product.
- **Request Parameters:**
  - `id` (Product ID)
- **Request Body:**
  - `rating`, `comment`
  - Files: Optional `reviewImg`
- **Response:**
  - Success: `201` with review and updated product stats.
  - Errors: Product/user not found, or user has already reviewed.

### 6. Delete Product Review

**Endpoint:** `DELETE /api/v1/products/product-review-delete/:id`

- **Purpose:** Remove a review posted by a user.
- **Request Parameters:**
  - `id` (Review ID)
- **Response:**
  - Success: `200` with review and updated product stats.
  - Errors: Review/product not found.

### 7. Product Search, Sort, Filter, and Pagination

**Endpoint:** `GET /api/v1/products/product-search/?`

- **Purpose:** Retrieve products with advanced filtering, sorting, and pagination.
- **Query Parameters:**
  - `search` (Fuzzy search by name, title, etc.)
  - `category`, `tags`, `rating`
  - `sortBy` (e.g., `price`), `sortOrder` (`asc` or `desc`)
  - `page`, `limit`
- **Caching:**
  - Results cached in Redis for 10 minutes.
- **Response:**
  - Success: `200` with paginated product data.
  - Errors: Server errors during search.

### 8. Fetch Single Product Details

**Endpoint:** `GET /api/v1/products/product-details/:id`

- **Purpose:** Retrieve details of a specific product.
- **Request Parameters:**
  - `id` (Product ID)
- **Caching:**
  - Product data cached in Redis for 15 minutes.
- **Response:**
  - Success: `200` with product details (including reviews).
  - Errors: Product not found.

---

This summary outlines the key functionalities and usage of the product-related APIs.

---

## Order Management API Summary

This document summarizes the API endpoints and their functionalities for managing orders in the system.

## Endpoints

### 1. **Create Order**
**Route:** `POST /api/v1/orders/create-order`

**Middleware:** `verifyJWT`

**Description:**
Creates a new order for the authenticated user. Handles product validation, discount coupon application, and order creation with Razorpay integration.

**Request Body:**
```json
{
  "products": [
    { "product": "productId", "quantity": number }
  ],
  "DiscountCoupon": "couponCode",
  "paymentType": "type",
  "shippingAddress": "address"
}
```

**Response:**
- **201 Created:**
  ```json
  {
    "statusCode": 201,
    "data": {
      "razorpayOrder": { ... },
      "orderId": "orderId"
    },
    "message": "Order created successfully"
  }
  ```

**Error Codes:**
- 404: User or products not found
- 400: Invalid coupon or insufficient stock

---

### 2. **Verify Order**
**Route:** `POST /api/v1/orders/order-varify`

**Middleware:** `verifyJWT`

**Description:**
Verifies the payment for an order using Razorpay’s signature and updates the payment status.

**Request Body:**
```json
{
  "razorpay_payment_id": "paymentId",
  "razorpay_order_id": "orderId",
  "razorpay_signature": "signature",
  "orderId": "localOrderId"
}
```

**Response:**
- **200 OK:**
  ```json
  {
    "statusCode": 200,
    "data": { ... },
    "message": "Order verified successfully"
  }
  ```
- **400 Bad Request:** Payment verification failed
- **404 Not Found:** Order not found

**Additional Features:**
- Sends an email confirmation with order details to the user after successful payment.

---

### 3. **Get All Orders**
**Route:** `GET /api/v1/orders/get-orders`

**Middleware:** `verifyJWT`

**Description:**
Fetches all orders for the authenticated user.

**Response:**
- **200 OK:**
  ```json
  {
    "statusCode": 200,
    "data": [ ... ],
    "message": "Orders fetched successfully"
  }
  ```
- **404 Not Found:** No orders found

---

### 4. **Get Order by ID**
**Route:** `GET /api/v1/orders/get-order/:id`

**Middleware:** `verifyJWT`

**Description:**
Fetches a single order by its ID for the authenticated user.

**Response:**
- **200 OK:**
  ```json
  {
    "statusCode": 200,
    "data": { ... },
    "message": "Order fetched successfully"
  }
  ```
- **404 Not Found:** Order not found

---

## Internal Features

### 1. **Stock and Order Updates**
- Ensures stock availability and deducts the quantity for each ordered product.
- Updates the total orders and stock for the products in bulk.

### 2. **Coupon Validation**
- Validates coupon codes for eligibility based on:
  - Expiry date
  - Minimum purchase amount
  - Usage limits
- Calculates discount and adjusts the final order amount accordingly.

### 3. **Razorpay Integration**
- Creates a Razorpay order for payment processing.
- Verifies the payment signature to confirm the transaction.

### 4. **Email Notifications**
- Sends a confirmation email to the user after successful payment with order details, including:
  - Order ID
  - Payment status
  - Shipping address
  - Total amount

---

## Example Email Content

**Subject:** Order Confirmation

```html
<div>
  <h1>Order Confirmed!</h1>
  <p>Hello, <strong>User Name</strong>,</p>
  <p>Thank you for shopping with us! Your order has been confirmed and will be shipped shortly. Below are the details of your order:</p>
  <ul>
    <li><strong>Order ID:</strong> orderId</li>
    <li><strong>Payment Type:</strong> paymentType</li>
    <li><strong>Payment Status:</strong> paymentStatus</li>
    <li><strong>Shipping Address:</strong> shippingAddress</li>
    <li><strong>Total Amount:</strong> ₹totalAmount</li>
  </ul>
  <p>Regards,<br><strong>STC Store Team</strong></p>
</div>
```

---

## Summary
This API suite provides robust functionality for managing orders, including creating, verifying, and fetching orders with real-time stock and payment validation. The integration with Razorpay ensures secure and reliable payment processing, while the email notifications enhance user experience.

---
---
## Contact Us API Summary

#### Endpoint: Create Contact Us Message
- **Route:** `/api/v1/contact/contact-us`
- **Method:** POST
- **Middleware:** None
- **Handler Function:** `createContactUs`

---

### Description:
The `createContactUs` endpoint allows users to send messages or inquiries to the organization. Each inquiry is stored in the database with a unique contact number, and email notifications are sent to both the user and the admin.

---

### Request Details:
- **Headers:** None required.
- **Body Parameters:**
  - `name` (string, required): The full name of the user.
  - `email` (string, required): The user's email address.
  - `phone` (string, required): The user's contact phone number.
  - `message` (string, required): The message or inquiry from the user.

---

### Response Details:
- **Success Response:**
  - **Status Code:** 201 (Created)
  - **Payload:**
    ```json
    {
        "status": 201,
        "data": "HELP123456",
        "message": "Message sent successfully"
    }
    ```
  - `data` contains the unique contact number.
- **Error Responses:**
  - **400 Bad Request:** Missing required fields or invalid data.
  - **500 Internal Server Error:** Unexpected server error during message creation or email sending.

---

### Features and Workflow:
1. **Unique Contact Number Generation:**
   - A unique contact number is generated in the format `HELPXXXXXX` (e.g., `HELP123456`).

2. **Contact Message Storage:**
   - Stores the message in the `Contact` collection with the following fields:
     - `name`
     - `email`
     - `phone`
     - `message`
     - `contactuniquenumber`

3. **Email Notifications:**
   - **To User:**
     - Confirms that the message was received.
     - Provides the user's unique contact number and inquiry details.
     - **Email Subject:** "Contact Us Message Confirmation"
     - **Content:** Includes user's name, email, phone, message, and unique contact number.
   - **To Admin:**
     - Sends the user's message details to the admin for review.
     - **Content:** Includes the user's name, email, phone, and message.

4. **Console Logging:**
   - Logs the result of the email sending function for debugging purposes.

---

### Example Request:
**POST Request Body:**
```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "1234567890",
    "message": "I would like to know more about your services."
}
```

**Response:**
```json
{
    "status": 201,
    "data": "HELP123456",
    "message": "Message sent successfully"
}
```

---

### Additional Notes:
- **Route Registration:**
  - The route is registered under `/api/v1/contact`.
  - Full endpoint path: `/api/v1/contact/contact-us`.
- **Scalability:** The endpoint efficiently handles asynchronous operations such as saving the contact message and sending emails to avoid performance bottlenecks.
- **Error Handling:** Proper error responses are sent in case of invalid input or server-side issues.




##
##

# Admin Authentication API Summary

This document provides an overview of the Admin Authentication API, which includes functionality for creating, logging in, and logging out admins. It also describes how authentication is managed with access and refresh tokens.

## API Endpoints

### 1. Create Admin
**Endpoint:** `/api/v1/admin/createAdmin`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "fullName": "string",
    "email": "string",
    "username": "string",
    "password": "string",
    "role": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "data": {
      "admin": {
        "_id": "string",
        "fullName": "string",
        "email": "string",
        "username": "string",
        "role": "string"
      }
    },
    "message": "Admin created successfully"
  }
  ```
- **Functionality:**
  - Creates a new admin in the database.
  - Generates access and refresh tokens for the admin.
  - Sets the tokens in HTTP-only cookies.

### 2. Login Admin
**Endpoint:** `/api/v1/admin/loginAdmin`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "data": {
      "_id": "string",
      "fullName": "string",
      "email": "string",
      "username": "string",
      "role": "string",
      "isActive": "boolean"
    },
    "message": "Admin logged in successfully"
  }
  ```
- **Functionality:**
  - Validates the provided email and password.
  - Generates access and refresh tokens upon successful login.
  - Sets the tokens in HTTP-only cookies.
  - Updates the refresh token in the database for the admin.

### 3. Logout Admin
**Endpoint:** `/api/v1/admin/logoutAdmin`
- **Method:** `POST`
- **Authentication Required:** Yes (JWT verification middleware `verifyAdminJWT` is used)
- **Response:**
  ```json
  {
    "statusCode": 200,
    "data": null,
    "message": "Admin logged out successfully"
  }
  ```
- **Functionality:**
  - Clears the refresh token stored in the database for the admin.
  - Clears the HTTP-only cookies for the access and refresh tokens.

## Authentication Workflow
1. **Access and Refresh Tokens:**
   - Tokens are issued during admin creation or login.
   - Access tokens are used to authenticate API requests and are set as HTTP-only cookies (`AdminAccessToken`).
   - Refresh tokens are stored in the database and sent as HTTP-only cookies (`AdminrefreshToken`).

2. **Token Security:**
   - Cookies are flagged as `HttpOnly` to prevent client-side access.
   - Refresh tokens are updated in the database for added security.

3. **Middleware:**
   - `verifyAdminJWT`: Validates access tokens for protected routes like logout.

## Notes
- Passwords are stored securely using hashing.
- Explicit password selection is required during login (`select("+password")`).
- Sensitive information (e.g., passwords, refresh tokens) is not returned in API responses.

---
##

**Authentication API Summary**

This document provides an overview of the authentication and authorization setup for the eCommerce project.

### **1. Authentication Middleware**
#### **JWT Verification Middleware**
- **`verifyAdminJWT`**: Ensures only admin users can access protected routes.
- **Implementation**:
  - Extracts the token from the request headers.
  - Verifies the token's validity.
  - Decodes the token payload to extract the user role.
  - Rejects unauthorized users.

### **2. Coupon Management API**
#### **Create Coupon Endpoint**
- **Route**: `POST /api/v1/discountcoupon/create-coupon`
- **Middleware**: `verifyAdminJWT`
- **Controller Function**: `createCoupon`
- **Functionality**:
  - Extracts coupon details from `req.body`.
  - Creates a new coupon record in the database.
  - Returns a success response with the created coupon.
- **Request Body Parameters**:
  ```json
  {
    "code": "DISCOUNT10",
    "discountType": "percentage",
    "discountValue": 10,
    "minimumPurchase": 100,
    "maximumDiscount": 50,
    "usageLimit": 5,
    "expiryDate": "2025-12-31"
  }
  ```
- **Response Example**:
  ```json
  {
    "status": 201,
    "message": "Coupon created successfully",
    "data": {
      "_id": "60a2b91f5e1a5c3f9c5d48a0",
      "code": "DISCOUNT10",
      "discountType": "percentage",
      "discountValue": 10,
      "minimumPurchase": 100,
      "maximumDiscount": 50,
      "usageLimit": 5,
      "expiryDate": "2025-12-31T00:00:00.000Z"
    }
  }
  ```

### **3. Authentication API Routes**

- **Admin Login**: `POST /api/v1/admin/loginAdmin`
- **Logout**: `POST /api/v1/admin/logout`

### **4. Authorization Levels**
- **Admin**: Full access to manage coupons, users, and orders.
- **User**: Can apply coupons during checkout but cannot create or modify them.

### **5. Middleware Usage**
- `verifyUserJWT`: Protects general user routes.
- `verifyAdminJWT`: Restricts access to admin-only endpoints.

This document serves as a reference for integrating authentication and authorization into the eCommerce project.
