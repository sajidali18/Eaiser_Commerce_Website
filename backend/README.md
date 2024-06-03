

# Express MongoDB JWT Authentication with Two-Step Verification

This project demonstrates how to implement login and logout functionality using Express, MongoDB, and JWT (JSON Web Tokens) with the addition of a two-step verification process for user registration.

## Features

- **User Registration**: Users can register by providing their email and password.
- **Two-Step Verification**: Upon successful registration, users receive an OTP (One-Time Password) via email for verification.
- **User Login**: Users can log in using their registered email and password.
- **JWT Authentication**: JSON Web Tokens are used for authentication after successful login.
- **Logout**: Users can log out, invalidating their JWT token.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/your/repository.git
   ```
2. Navigate to the project directory:
   ```
   cd express-mongodb-jwt-authentication
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define the following variables:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/your-database
     JWT_SECRET=your-secret-key
     EMAIL_USERNAME=your-email-username
     EMAIL_PASSWORD=your-email-password
     ```
   Replace `your-database`, `your-secret-key`, `your-email-username`, and `your-email-password` with your MongoDB database name, JWT secret key, email username, and email password respectively.

## Usage

1. Start the server:
   ```
   npm start
   ```
2. The server will run on `http://localhost:3000` by default.
3. Use API endpoints to register, login, and logout users.

## API Endpoints

### Register User

- **URL**: `/api/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
      "email": "user@example.com",
      "password": "password"
  }
  ```
- **Response**:
  ```json
  {
      "message": "User registered successfully. Please verify your email."
  }
  ```

### Login User

- **URL**: `/api/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
      "email": "user@example.com",
      "password": "password"
  }
  ```
- **Response**:
  ```json
  {
      "token": "your.jwt.token"
  }
  ```

### Logout User

- **URL**: `/api/logout`
- **Method**: `POST`
- **Request Headers**:
  ```
  Authorization: Bearer your.jwt.token
  ```
- **Response**:
  ```json
  {
      "message": "User logged out successfully."
  }
  ```

## Contributing

Feel free to contribute by submitting pull requests or suggesting improvements. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
