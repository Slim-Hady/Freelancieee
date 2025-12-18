# Freelancieee

A functional prototype of the Freelancieee system built with the MERN stack, demonstrating three key design patterns: Factory, Facade, and Strategy.

This is a Freelance website for System Analysis and Design course - Implementation based on UML design patterns.

## 🏗️ Architecture

This project implements the following design patterns:

### 1. **Factory Pattern** (Payment Processing)
- **Location:** `backend/patterns/factory/PaymentProcessorFactory.js`
- **Classes:** `CreditCardProcessor`, `PayPalProcessor`, `BankTransferProcessor`, `CryptoProcessor`
- **Purpose:** Creates different payment processor instances based on payment type
- **Demo:** Payment Component in the frontend

### 2. **Facade Pattern** (Job Management)
- **Location:** `backend/patterns/facade/JobFacade.js`
- **Subsystems:** `JobPoster`, `JobBrowser`, `JobApplicator`, `WorkApprover`
- **Purpose:** Provides a simplified interface to complex job management subsystems
- **Demo:** Job Dashboard in the frontend

### 3. **Strategy Pattern** (Notifications)
- **Location:** `backend/patterns/strategy/NotificationStrategy.js`
- **Strategies:** `EmailNotifier`, `SmsNotifier`, `PushNotifier`, `InAppNotifier`
- **Purpose:** Allows switching between different notification methods at runtime
- **Demo:** Notification Settings in the frontend

## 📁 Project Structure

```
Freelancieee/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── jobController.js     # Job-related endpoints
│   │   ├── notificationController.js
│   │   ├── paymentController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Job.js               # Job schema
│   │   ├── Payment.js           # Payment schema
│   │   └── User.js              # User schema
│   ├── patterns/
│   │   ├── factory/             # Factory Pattern implementation
│   │   ├── facade/              # Facade Pattern implementation
│   │   └── strategy/            # Strategy Pattern implementation
│   ├── routes/
│   │   ├── jobRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── userRoutes.js
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobDashboard.jsx
│   │   │   ├── NotificationSettings.jsx
│   │   │   ├── PaymentComponent.jsx
│   │   │   └── UserManagement.jsx
│   │   ├── services/
│   │   │   └── api.js           # Axios API service
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (running locally or remote connection)
- **npm** or **yarn**

### Installation & Setup

#### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

#### 3. Configure Environment Variables

Edit `backend/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/freelancieee
```

### Running the Application

#### Option 1: Run Both Servers Separately

**Terminal 1 - Backend Server:**
```bash
cd backend
node server.js
```
Server will start on http://localhost:5000

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm run dev
```
Frontend will start on http://localhost:3000

#### Option 2: Quick Start (if MongoDB is running)

```bash
# Terminal 1
cd backend && node server.js

# Terminal 2
cd frontend && npm run dev
```

Then open your browser to: **http://localhost:3000**

## 📋 Usage Guide

### Step 1: Create Users
1. Navigate to the **User Management** tab
2. Click "Create New User"
3. Add both Freelancers and Clients

### Step 2: Create Jobs (Facade Pattern Demo)
1. Go to the **Jobs (Facade)** tab
2. Click "Create New Job"
3. Fill in job details and select a client
4. The JobFacade coordinates multiple subsystems behind the scenes

### Step 3: Apply to Jobs
1. Select a freelancer from the dropdown
2. Click "Apply to Job" on any open job
3. The application is processed through the Facade pattern

### Step 4: Process Payments (Factory Pattern Demo)
1. Navigate to **Payments (Factory)** tab
2. Select a payment type (Credit Card, PayPal, Bank Transfer, or Crypto)
3. Enter an amount and optional user details
4. Click "Process Payment"
5. The Factory pattern creates the appropriate payment processor

### Step 5: Send Notifications (Strategy Pattern Demo)
1. Go to **Notifications (Strategy)** tab
2. Select a notification method (Email, SMS, Push, or In-App)
3. Enter recipient and message
4. The Strategy pattern uses the selected notification method

## 🔗 API Endpoints

### Users
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get user by ID

### Jobs
- `POST /api/jobs` - Create a job
- `GET /api/jobs` - Browse all jobs
- `GET /api/jobs/:jobId` - Get job details
- `POST /api/jobs/apply` - Apply to a job
- `POST /api/jobs/assign` - Assign job to freelancer
- `POST /api/jobs/complete` - Mark job as completed

### Payments
- `POST /api/pay` - Process a payment
- `GET /api/payments` - Get all payments

### Notifications
- `POST /api/notify` - Send a notification
- `POST /api/preference` - Update notification preference

## 🎯 Design Pattern Details

### Factory Pattern (Payment Processing)
The `PaymentProcessorFactory.createProcessor(type)` method returns the appropriate processor instance:
- Returns `CreditCardProcessor` for 'creditcard'
- Returns `PayPalProcessor` for 'paypal'
- Returns `BankTransferProcessor` for 'banktransfer'
- Returns `CryptoProcessor` for 'crypto'

### Facade Pattern (Job Management)
The `JobFacade` class provides simple methods that coordinate complex operations:
- `createJob()` - Uses JobPoster subsystem
- `browseJobs()` - Uses JobBrowser subsystem
- `applyToJob()` - Uses JobApplicator subsystem
- `completeJob()` - Uses WorkApprover subsystem

### Strategy Pattern (Notifications)
The `MessageSender` context class can use different notification strategies:
- `EmailNotifier` - Sends email notifications
- `SmsNotifier` - Sends SMS notifications
- `PushNotifier` - Sends push notifications
- `InAppNotifier` - Sends in-app notifications

The strategy can be changed at runtime using `setStrategy()`.

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **React Router DOM** - Routing (prepared for use)

## 📝 Notes

- This is a **prototype** demonstrating design patterns, not a production-ready application
- Authentication and authorization are not implemented
- All design patterns are implemented using standard JavaScript classes
- The application uses minimal dependencies as specified
- MongoDB must be running for the backend to work properly

## 🧪 Testing the Patterns

Each design pattern can be tested independently:

1. **Factory Pattern**: Use the Payment component to process payments with different payment types
2. **Facade Pattern**: Use the Job Dashboard to create and manage jobs
3. **Strategy Pattern**: Use the Notification Settings to send notifications via different channels

## 🤝 Contributing

This is a course project for System Analysis and Design. The implementation follows the provided UML class diagrams.

## 📄 License

This project is created for educational purposes. 
