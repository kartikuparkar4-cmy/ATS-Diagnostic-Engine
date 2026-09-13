# 🚀 Complete Setup Guide - ATS Resume Analyzer

## ✅ Current Status

✅ **Backend server**: Running on http://localhost:5000
✅ **Frontend**: Ready to start on http://localhost:3000
✅ **Authentication system**: Connected (login/register/logout)
✅ **API integration**: Frontend now calls backend APIs
❌ **MongoDB**: Not installed/running (REQUIRED for database storage)

---

## 📋 Prerequisites

Before you can use the full application, you need:

1. ✅ Node.js (already installed)
2. ✅ npm (already installed)
3. ❌ **MongoDB** (needs installation)

---

## 🗄️ MongoDB Setup (REQUIRED)

You have **TWO OPTIONS**:

### Option 1: MongoDB Atlas (Cloud - Recommended for beginners)
**Free tier available, no installation needed**

1. **Create account**: Go to https://www.mongodb.com/cloud/atlas/register
2. **Create cluster**: 
   - Choose "Free" tier (M0)
   - Select your closest region
   - Click "Create Cluster"
3. **Get connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. **Update server/.env**:
   ```env
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/ats-analyzer?retryWrites=true&w=majority
   ```
5. **Restart backend server** (it will auto-restart when you save .env)

### Option 2: Local MongoDB Installation
**For advanced users who want full control**

#### Windows:
1. **Download**: https://www.mongodb.com/try/download/community
   - Select "Windows" platform
   - Download MSI installer
2. **Install**:
   - Run the installer
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - Finish installation
3. **Verify MongoDB is running**:
   ```powershell
   mongo --version
   # OR
   mongod --version
   ```
4. MongoDB should now be running on `mongodb://localhost:27017`
5. The backend server will automatically connect!

#### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

---

## 🎬 Starting the Application

Once MongoDB is set up, follow these steps:

### 1. Start Backend Server (Port 5000)
```powershell
cd server
npm run dev
```

**Expected output:**
```
🚀 Server running on http://localhost:5000
✅ MongoDB Connected: localhost:27017
```

### 2. Start Frontend (Port 3000)
Open a **NEW terminal** window:
```powershell
cd "c:\Users\USER\Downloads\ats proj"
npm run dev
```

**Expected output:**
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

### 3. Open in Browser
Navigate to: http://localhost:3000

---

## 🧪 Testing the Full Application

### Step 1: Register a New Account
1. Click "Sign In" button in the top-right
2. Click "Don't have an account? Sign up"
3. Enter email: `test@example.com`
4. Enter password: `password123`
5. Click "Create Account"

**What happens:**
- ✅ Account created in MongoDB
- ✅ JWT token stored in browser
- ✅ User logged in automatically

### Step 2: Analyze a Resume
1. Paste a job description in the left text area
2. Upload a PDF resume (drag & drop or click to browse)
3. Click "Analyze Resume"

**What happens:**
- ✅ Resume sent to backend
- ✅ Backend calls Gemini AI API (your key is hidden/secure)
- ✅ Analysis saved to MongoDB
- ✅ Results shown with score visualization

### Step 3: View History
1. Click "History" button
2. See all your past analyses
3. Click any analysis to view details

**What happens:**
- ✅ Fetches from MongoDB database
- ✅ Shows persistent data (not just browser storage)

### Step 4: Sign Out & Sign In Again
1. Click "Sign Out"
2. Click "Sign In" 
3. Enter same credentials
4. History is still there!

**This proves:**
- ✅ Real authentication working
- ✅ Database persistence working
- ✅ Data saved across sessions

---

## 🔧 Troubleshooting

### Backend won't start
**Check logs in the terminal running `npm run dev` in server folder**

Common issues:
1. **Port 5000 already in use:**
   ```powershell
   # Find process using port 5000
   netstat -ano | findstr :5000
   # Kill it (replace PID with actual process ID)
   taskkill /PID <PID> /F
   ```

2. **MongoDB connection error:**
   ```
   ❌ MongoDB Connection Error: ECONNREFUSED
   ```
   - **Solution**: Install MongoDB (see section above)
   - OR use MongoDB Atlas (cloud option)

3. **Missing environment variables:**
   - Make sure `server/.env` exists
   - Check it has all required fields (see `server/.env.example`)

### Frontend errors
1. **"Network Error" when analyzing:**
   - Make sure backend is running on port 5000
   - Check `VITE_API_URL` in `.env` is `http://localhost:5000/api`

2. **"Please login to analyze":**
   - This is correct! Click "Sign In" to create account

### MongoDB Atlas connection issues
1. **"Authentication failed":**
   - Double-check username/password in connection string
   - Make sure you replaced `<password>` with your actual password

2. **"Network timeout":**
   - Add your IP address to Atlas whitelist
   - Go to "Network Access" in Atlas dashboard
   - Click "Add IP Address" → "Allow Access from Anywhere" (for development)

---

## 📁 Project Structure

```
ats proj/
├── server/                 # Backend (Port 5000)
│   ├── src/
│   │   ├── server.ts      # Express server
│   │   ├── routes/        # API endpoints
│   │   ├── models/        # MongoDB schemas
│   │   ├── services/      # Gemini AI, Email
│   │   └── middleware/    # JWT auth
│   ├── .env              # Backend config (DO NOT COMMIT)
│   └── package.json
├── src/                   # Frontend (Port 3000)
│   ├── App.tsx           # Main React component
│   ├── services/
│   │   └── api.ts        # API client (axios)
│   └── components/
├── .env                  # Frontend config
├── README.md
├── BACKEND_README.md
├── SECURITY_CHECKLIST.md
└── SETUP_GUIDE.md        # This file
```

---

## 🔐 Security Notes

### ✅ What's Secure:
- Gemini API key hidden in backend (not exposed to browser)
- JWT tokens for authentication
- Passwords hashed with bcrypt
- `.env` files in `.gitignore` (not committed to GitHub)

### ⚠️ Before Production:
1. Change `JWT_SECRET` in `server/.env` to a random string
2. Use strong MongoDB password
3. Set up email service (Gmail with app password OR SendGrid)
4. Enable HTTPS
5. Set proper CORS origins (not `*`)

---

## 📧 Email Setup (Optional)

To send analysis reports via email:

### Gmail Setup:
1. Enable 2-factor authentication on your Google account
2. Generate App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password
3. Update `server/.env`:
   ```env
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

### Test Email:
```powershell
curl http://localhost:5000/api/email/test -Method POST
```

---

## 🎯 What's Next?

Once MongoDB is installed and both servers are running:

1. ✅ Register/Login works
2. ✅ Resume analysis saves to database
3. ✅ History persists across sessions
4. ✅ API keys are secure
5. ✅ Ready for GitHub (with `.env` files excluded)

### Optional Enhancements:
- [ ] Add email functionality (send analysis via email)
- [ ] Deploy backend to Heroku/Railway
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Add more AI features (cover letter generator, etc.)

---

## 🆘 Need Help?

**Common Commands:**

```powershell
# Check if backend is running
curl http://localhost:5000/api/health

# Check if MongoDB is running (local)
mongosh
# OR
mongo

# View backend logs
# (Look at terminal running 'npm run dev' in server folder)

# Restart backend server
# Press Ctrl+C in server terminal, then run 'npm run dev' again
```

**Check server status:**
- Backend: http://localhost:5000/api/health
- Frontend: http://localhost:3000

---

## ✅ Success Checklist

Before using the app, verify:

- [ ] MongoDB installed/configured (local OR Atlas)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] No errors in backend terminal
- [ ] Can access http://localhost:3000 in browser
- [ ] "Sign In" button visible
- [ ] Backend logs show "MongoDB Connected"

**If all checked, you're ready to go! 🎉**

---

## 📝 Quick Start (After MongoDB Setup)

```powershell
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
npm run dev

# Open browser
# Go to http://localhost:3000
# Click "Sign In" → Register → Analyze Resume
```

**That's it! Enjoy your ATS Resume Analyzer! 🚀**
