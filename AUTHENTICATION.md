# Authentication & Account Management

This document describes the authentication and account management system implemented in Freelancieee.

## Overview

Freelancieee now includes a complete production-ready authentication system with:
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Profile management
- Password change functionality
- Password reset capability
- Role-based access control

## Features

### 1. User Registration
- Users can create an account as either a **Freelancer** or **Client**
- Required fields: name, email, password, role
- Password validation:
  - Minimum 6 characters
  - Must contain at least one number
- Email validation and uniqueness check
- Automatic password hashing using bcrypt

### 2. User Login
- Email and password authentication
- JWT token generation (7-day expiration)
- Token stored in localStorage
- Automatic session restoration on page reload

### 3. Profile Management
- View and update profile information
- Update bio and skills
- Change notification preferences
- Profile picture support (ready for implementation)

### 4. Password Management
- Change password (requires current password)
- Password reset via token
- Password strength validation

### 5. Security Features
- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected API routes with authentication middleware
- Role-based authorization
- Input validation and sanitization
- Secure password reset tokens

## API Endpoints

### Authentication Routes

All authentication routes are prefixed with `/api/auth`

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "freelancer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "freelancer"
  }
}
```

#### POST /api/auth/login
Login to an existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "freelancer"
  }
}
```

#### GET /api/auth/profile
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "freelancer",
    "bio": "",
    "skills": [],
    "preferredNotification": "email"
  }
}
```

#### PUT /api/auth/profile
Update user profile (requires authentication).

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Request Body:**
```json
{
  "name": "John Doe",
  "bio": "Full-stack developer with 5 years experience",
  "skills": ["JavaScript", "React", "Node.js"],
  "preferredNotification": "email"
}
```

#### PUT /api/auth/change-password
Change user password (requires authentication).

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

#### POST /api/auth/password-reset-request
Request a password reset token.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

#### POST /api/auth/password-reset
Reset password using token.

**Request Body:**
```json
{
  "resetToken": "reset-token-here",
  "newPassword": "newpassword123"
}
```

#### DELETE /api/auth/account
Delete user account (requires authentication).

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Request Body:**
```json
{
  "password": "password123"
}
```

## Frontend Components

### Authentication Context
The `AuthContext` provides global authentication state management:

```jsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Use authentication state and methods
}
```

**Available Methods:**
- `register(name, email, password, role)` - Register new user
- `login(email, password)` - Login user
- `logout()` - Logout user
- `updateProfile(profileData)` - Update user profile
- `changePassword(currentPassword, newPassword)` - Change password

**Available State:**
- `user` - Current user object
- `token` - JWT token
- `loading` - Loading state
- `error` - Error message
- `isAuthenticated` - Boolean indicating if user is logged in

### Components

#### Login Component
Displays login form with email and password fields.

#### Register Component
Displays registration form with:
- Full name
- Email
- Role selection (Freelancer/Client)
- Password
- Confirm password

#### Profile Component
Displays user profile with tabs for:
- **Profile Details**: Update name, bio, skills, notification preferences
- **Security**: Change password

## User Model

The User schema includes:

```javascript
{
  name: String,
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['freelancer', 'client']),
  preferredNotification: String (enum: ['email', 'sms', 'push', 'inapp']),
  bio: String,
  skills: [String],
  portfolio: [Object],
  profileImage: String,
  isVerified: Boolean,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication Flow

### Registration Flow
1. User fills registration form
2. Frontend validates input
3. POST request to `/api/auth/register`
4. Backend validates and hashes password
5. User created in database
6. JWT token generated and returned
7. Token stored in localStorage
8. User redirected to dashboard

### Login Flow
1. User enters email and password
2. Frontend validates input
3. POST request to `/api/auth/login`
4. Backend verifies credentials
5. JWT token generated and returned
6. Token stored in localStorage
7. User redirected to dashboard

### Protected Routes Flow
1. User makes request to protected endpoint
2. Frontend includes JWT token in Authorization header
3. Backend middleware verifies token
4. If valid, request proceeds
5. If invalid, 401 error returned

## Security Considerations

### Implemented
- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Input validation with express-validator
- ✅ Password strength requirements
- ✅ Email format validation
- ✅ Protected API routes
- ✅ Role-based authorization
- ✅ Secure password reset tokens

### Production Recommendations
- Use HTTPS/TLS in production
- Set secure JWT_SECRET environment variable
- Implement rate limiting on auth endpoints
- Add email verification for new accounts
- Implement refresh tokens
- Add account lockout after failed login attempts
- Enable CORS only for trusted domains
- Implement logging and monitoring
- Add two-factor authentication (2FA)

## Environment Variables

Required environment variables in `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/freelancieee
JWT_SECRET=your-secret-key-change-in-production
```

**Important:** Always change the JWT_SECRET in production to a secure random string.

Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Usage Examples

### Register a New User (cURL)
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "freelancer"
  }'
```

### Login (cURL)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Profile (cURL)
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Testing

To test the authentication system:

1. Start MongoDB:
   ```bash
   mongod
   ```

2. Start the backend:
   ```bash
   cd backend
   npm start
   ```

3. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

4. Navigate to http://localhost:3000
5. Click "Register here" to create an account
6. After registration, you'll be automatically logged in
7. Navigate to "My Profile" to manage your account

## Troubleshooting

### "Registration failed" error
- Ensure MongoDB is running
- Check that the email is not already registered
- Verify password meets requirements (6+ characters with a number)

### "Invalid token" error
- Token may have expired (7-day expiration)
- Try logging in again
- Check that JWT_SECRET is set correctly

### "Access denied" error
- Ensure you're including the token in the Authorization header
- Format: `Authorization: Bearer YOUR_TOKEN`
- Verify the token is valid and not expired
