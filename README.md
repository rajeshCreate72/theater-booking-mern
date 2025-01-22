# 🎭 Theater Booking MERN Application

This project is a theater booking system built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows users to book movie tickets, select seats, and manage bookings seamlessly.

---

## 📁 Project Structure

The project is organized into two main directories:

- **client**: Contains the frontend code developed with React.js.
- **server**: Contains the backend code developed with Node.js and Express.js.

---

## ✨ Features

- **User Authentication**:
  - Register and log in securely using JSON Web Tokens (JWT).
- **Movies List**:
  - Browse a list of available movies and showtimes.
- **Seat Selection**:
  - Interactive UI for choosing your preferred seats.
- **Payment Integration**:
  - Stripe API is integrated for secure online payments.
- **User Dashboard**:
  - View and manage your bookings.
- **Responsive Design**:
  - Optimized for mobile and desktop devices using Tailwind CSS.

---

## 🛠 Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB**: [Download and install MongoDB](https://www.mongodb.com/try/download/community)
- **Stripe API Key**: Sign up for a [Stripe account](https://stripe.com/) and obtain your API keys.

---

## 🚀 Installation

1. **Clone the Repository and Navigate to the Project Directory**:

    ```bash
    git clone https://github.com/rajeshCreate72/theater-booking-mern.git
    cd theater-booking-mern
    ```

2. **Install Dependencies**:

    ```bash
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd ../client
    npm install
    ```

3. **Set Up Environment Variables**:

    Create a `.env` file in the `server` directory with the following content:

    ```env
    PORT=8080
    DATABASE=<Your MongoDB connection string URI>
    JWT_SECRET=<Your JWT secret>
    STRIPE_SECRET=<Your Stripe secret key>
    ```

4. **Run the Application**:

    ```bash
    # Start the backend server
    cd ../server
    npm start

    # Open a new terminal and start the frontend application
    cd ../client
    npm start
    ```

5. **Access the Application**:

    - Open your browser and navigate to `http://localhost:3000` to access the app.

---

## 🌐 Live Demo

A live version of the application is available at:

[theater-booking-mern-client.vercel.app](https://theater-booking-mern-client.vercel.app)

