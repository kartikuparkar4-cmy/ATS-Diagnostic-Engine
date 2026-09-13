# 🚀 ATS Resume Analyzer - Backend Setup Guide

Complete backend with **Authentication**, **Database Storage**, **Email Service**, and **Secure API**.

---

## ✨ Features Implemented

✅ **User Authentication** - JWT-based auth with secure password hashing  
✅ **MongoDB Database** - Persistent storage for users and analyses  
✅ **Secure API Proxy** - Gemini API key hidden from frontend  
✅ **Email Service** - Send analysis reports via email  
✅ **Analysis History** - Save and retrieve past analyses  
✅ **CRUD Operations** - Full create, read, update, delete functionality  

---

## 📋 Prerequisites

Before starting, install:

1. **Node.js** (v18+ recommended)
2. **MongoDB** (Local or MongoDB Atlas)
   - Local: https://www.mongodb.com/try/download/community
   - Cloud: https://www.mongodb.com/cloud/atlas/register

---

## 🛠️ Setup Instructions

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 2: Configure Environment Variables

Create `.env` file in `server/` directory:

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/ats-analyzer
# OR MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/ats-analyzer

# JWT Secret (Generate a strong random string!)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Gemini AI API
GEMINI_API_KEY=your-gemini-api-key-here

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=ATS Analyzer <noreply@atsanalyzer.com>
```

### Step 3: Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB from https://www.mongodb.com/try/download/community
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Step 4: Configure Email (Gmail Example)

1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate App Password: https://myaccount.google.com/apppasswords
4. Use this password in `EMAIL_PASSWORD`

### Step 5: Update Frontend `.env`

In root project directory, update `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 6: Start Backend Server

```bash
cd server
npm run dev
```

Server will start on **http://localhost:5000**

### Step 7: Start Frontend

In a new terminal:

```bash
npm run dev
```

Frontend will start on **http://localhost:3000**

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Analysis
- `POST /api/analysis/analyze` - Analyze resume (Protected)
- `GET /api/analysis/history` - Get analysis history (Protected)
- `GET /api/analysis/:id` - Get single analysis (Protected)
- `DELETE /api/analysis/:id` - Delete analysis (Protected)

### Email
- `POST /api/email/send-analysis` - Send analysis via email (Protected)
- `POST /api/email/test` - Test email configuration (Protected)

---

## 🔒 Security Features

✅ **Password Hashing** - bcrypt with salt rounds  
✅ **JWT Tokens** - Secure authentication tokens  
✅ **API Key Protection** - Gemini key hidden on backend  
✅ **CORS Configuration** - Restricts frontend access  
✅ **Input Validation** - Prevents malicious data  

---

## 🗄️ Database Schema

### User Collection
```typescript
{
  email: string (unique, required)
  password: string (hashed, required)
  name: string (optional)
  createdAt: Date
}
```

### Analysis Collection
```typescript
{
  userId: ObjectId (ref: User)
  jobDescription: string
  resume: string
  result: string
  score: number (0-100)
  keywordScore: number
  skillsScore: number
  experienceScore: number
  formatScore: number
  title: string
  createdAt: Date
}
```

---

## 🧪 Testing the Backend

### Test Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## 🚨 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For Atlas: Whitelist your IP address

### Email Not Sending
- Verify Gmail App Password (not regular password)
- Check EMAIL_* variables in `.env`
- Test with `/api/email/test` endpoint

### CORS Errors
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL
- Check browser console for specific CORS error

### JWT Token Issues
- Ensure `JWT_SECRET` is set in `.env`
- Token expires after 7 days - login again

---

## 📦 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Set environment variables on hosting platform
2. Use MongoDB Atlas for production database
3. Update `FRONTEND_URL` to production URL
4. Build: `npm run build`
5. Start: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. Update `VITE_API_URL` to production backend URL
2. Build: `npm run build`
3. Deploy `dist` folder

---

## 🎉 You're All Set!

Backend is now fully functional with:
- ✅ User accounts
- ✅ Secure authentication
- ✅ Database storage
- ✅ Email functionality
- ✅ Protected API endpoints

**Happy Coding!** 🚀
