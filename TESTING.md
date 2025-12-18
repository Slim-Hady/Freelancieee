# Testing Guide for Freelancieee

## Prerequisites Check

Before running the application, ensure you have:

1. ✅ Node.js (v18+) installed
2. ✅ MongoDB running (locally on port 27017 or update MONGODB_URI in backend/.env)
3. ✅ Backend dependencies installed (`cd backend && npm install`)
4. ✅ Frontend dependencies installed (`cd frontend && npm install`)

## Testing the Design Patterns (Standalone)

You can test the design patterns without running MongoDB:

```bash
cd backend
node test-patterns.js
```

This will test:
- ✅ Factory Pattern (4 payment processors)
- ✅ Strategy Pattern (4 notification strategies)

## Running the Full Application

### Step 1: Start MongoDB

Make sure MongoDB is running. If using default local installation:

```bash
# MongoDB should be running on mongodb://localhost:27017
# If not started, run:
mongod
```

### Step 2: Start the Backend Server

```bash
cd backend
node server.js
```

Expected output:
```
Server is running on port 5000
MongoDB Connected: localhost
```

### Step 3: Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 4: Open the Application

Navigate to http://localhost:3000 in your browser.

## Testing Workflow

### 1. User Management
1. Click "User Management" tab
2. Click "Create New User"
3. Create at least 2 users:
   - One with role "client"
   - One with role "freelancer"
4. Verify users appear in the table

### 2. Jobs (Facade Pattern)
1. Click "Jobs (Facade)" tab
2. Click "Create New Job"
3. Fill in:
   - Title: "Website Development"
   - Description: "Build a responsive website"
   - Budget: 1000
   - Client: Select the client you created
4. Click "Create Job"
5. Verify job appears in the jobs list
6. Select a freelancer from dropdown
7. Click "Apply to Job"
8. Verify applicant count increases

### 3. Payments (Factory Pattern)
1. Click "Payments (Factory)" tab
2. Select different payment types one by one:
   - Credit Card
   - PayPal
   - Bank Transfer
   - Cryptocurrency
3. Enter amount (e.g., 100)
4. Optionally select users
5. Click "Process Payment"
6. Verify success message with transaction ID
7. Notice different transaction ID prefixes for each payment type

### 4. Notifications (Strategy Pattern)
1. Click "Notifications (Strategy)" tab
2. Test sending notification:
   - Select notification type (Email, SMS, Push, In-App)
   - Enter recipient: "test@example.com"
   - Enter message: "Test notification"
   - Click "Send Notification"
   - Check browser console for log output
3. Test updating preference:
   - Select a user
   - Choose preferred notification method
   - Click "Update Preference"
   - Verify success message

## API Testing with curl

You can also test the API directly:

### Create User
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","role":"freelancer"}'
```

### Create Job
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Job","description":"Description","budget":500,"clientId":"USER_ID"}'
```

### Process Payment
```bash
curl -X POST http://localhost:5000/api/pay \
  -H "Content-Type: application/json" \
  -d '{"amount":100,"paymentType":"creditcard"}'
```

### Send Notification
```bash
curl -X POST http://localhost:5000/api/notify \
  -H "Content-Type: application/json" \
  -d '{"recipient":"test@example.com","message":"Hello","notificationType":"email"}'
```

## Verifying Design Patterns

### Factory Pattern Verification
- Navigate to Payments tab
- Process payment with different types
- Check transaction IDs have different prefixes:
  - CC-* for Credit Card
  - PP-* for PayPal
  - BT-* for Bank Transfer
  - CRYPTO-* for Cryptocurrency
- This confirms different processor classes are being created

### Facade Pattern Verification
- Navigate to Jobs tab
- Create a job (uses JobPoster subsystem)
- View jobs (uses JobBrowser subsystem)
- Apply to job (uses JobApplicator subsystem)
- All operations go through single JobFacade interface

### Strategy Pattern Verification
- Navigate to Notifications tab
- Send notifications with different types
- Check browser console logs show different output formats:
  - [EMAIL] prefix for email
  - [SMS] prefix for SMS
  - [PUSH] prefix for push
  - [IN-APP] prefix for in-app
- This confirms different strategy classes are being used

## Browser Console Logs

Open browser DevTools (F12) and check Console tab to see:
- API request/response logs
- Notification strategy outputs
- Any errors or warnings

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify port 5000 is not in use
- Check .env file exists in backend/

### Frontend won't start
- Verify backend is running first
- Check port 3000 is not in use
- Clear npm cache: `npm cache clean --force`

### Database errors
- Ensure MongoDB is running
- Check MONGODB_URI in backend/.env
- Verify MongoDB connection string is correct

### API 404 errors
- Ensure backend is running
- Check Vite proxy configuration in vite.config.js
- Verify API endpoints match routes

## Expected Results

After following all steps, you should have:
- ✅ Users created in database
- ✅ Jobs created and managed through Facade
- ✅ Payments processed through Factory
- ✅ Notifications sent through Strategy
- ✅ All design patterns demonstrated and working

## Production Build

To create production builds:

```bash
# Frontend
cd frontend
npm run build
# Output in frontend/dist/

# Backend (no build needed, runs with Node)
cd backend
NODE_ENV=production node server.js
```

## Notes

- This is a prototype/demo application
- No authentication implemented
- Data validation is basic
- Designed to demonstrate design patterns
- For educational purposes only
