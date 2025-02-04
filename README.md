Two-Backend System with Secure API Communication

Project Overview

This project demonstrates a two-backend architecture built using Express.js and MongoDB to handle sensitive and non-sensitive user data separately. The architecture ensures secure API communication, password hashing, and data aggregation.

Objective

Backend 1: Manages sensitive user data such as usernames, emails, and passwords.

Backend 2: Manages non-sensitive profile data such as bios and interests.

Data Aggregation: Backend 1 exposes an endpoint to aggregate and serve data from both backends.

Features

Password hashing using bcrypt for secure storage.

Secure communication between backends via token validation.

Data aggregation endpoint in Backend 1 to retrieve combined user information.

Technologies Used

Backend Framework: Express.js

Database: MongoDB with Mongoose

Security: bcrypt for password hashing

API Communication: Axios

Endpoints

Backend 1 (Sensitive Data Service)

POST /user

Request Body:

{
"username": "johndoe",
"email": "johndoe@example.com",
"password": "securepassword123",
"bio": "Software Developer",
"interests": ["coding", "gaming"]
}

Response:

{
"message": "User data saved successfully"
}

Tasks:

Hash the password before saving.

Save username, email, and hashed password.

Forward bio and interests to Backend 2 securely.

GET /user/:id

Response:

{
"username": "johndoe",
"email": "johndoe@example.com",
"bio": "Software Developer",
"interests": ["coding", "gaming"]
}

Tasks:

Fetch sensitive data from Backend 1.

Make a secure API call to Backend 2 to fetch non-sensitive data.

Combine and return the data.

Backend 2 (Non-Sensitive Data Service)

POST /profile

Request Body:

{
"userId": "<user-id>",
"bio": "Software Developer",
"interests": ["coding", "gaming"]
}

Response:

{
"message": "Profile data saved successfully"
}

Task: Save non-sensitive profile data.

GET /profile/:userId

Response:

{
"bio": "Software Developer",
"interests": ["coding", "gaming"]
}

Security Measures

Passwords are hashed using bcrypt before storage.

Environment variables manage secrets for securing communication between backends.

Secure API calls between backends using tokens.

Installation and Setup

Prerequisites

Node.js

MongoDB

Instructions

Clone the repository:

git clone https://github.com/jannatul-akhi/two-backend-project

Navigate to each backend directory and install dependencies:

cd backend-one
npm install

cd backend-two
npm install

Set environment variables:

Create a .env file in each backend directory with the following variables:

PORT=<port-number>
MONGO_URI=<mongodb-uri>

Start each backend:

npm start

Use tools like Postman to test the endpoints.

Testing

Ensure both backends are running.

Test the /user POST and GET endpoints in Backend one.

Verify that passwords are hashed in the database.

Confirm that data aggregation works correctly.

GitHub Submission

The project includes a minimum of five commits.

Detailed commit messages are provided for better understanding.

Future Enhancements

Implement user authentication and authorization.

Add detailed error handling.

Deploy the system to a cloud provider.
