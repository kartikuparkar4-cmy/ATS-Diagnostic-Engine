# ⚡ Quick Start Checklist

**Goal:** Get your ATS Resume Analyzer running in 10 minutes

---

## ✅ Pre-flight Check

Before starting, verify:

- [ ] Node.js installed (`node --version`)
- [ ] Backend server running (should already be started)
- [ ] You have 5-10 minutes

---

## 🚀 3 Steps to Success

### Step 1: MongoDB Setup (5 minutes)

**Choose ONE option:**

#### 🌐 Option A: MongoDB Atlas (Easiest)
```
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Create M0 FREE cluster
4. Create database user with password
5. Allow access from anywhere (0.0.0.0/0)
6. Get connection string
7. Edit server/.env:
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ats-analyzer
8. Save file (backend auto-restarts)
```

#### 💻 Option B: Local MongoDB (Advanced)
```
1. Download: https://www.mongodb.com/try/download/community
2. Install as Windows Service
3. Verify: mongod --version
4. Done! (server/.env already configured)
```

**📖 Need help?** See [MONGODB_SETUP.md](MONGODB_SETUP.md)

### Step 2: Verify Backend (30 seconds)

Check backend terminal - should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```
OR
```
✅ MongoDB Connected: localhost:27017
```

**❌ Still seeing error?**
- Wait 30 seconds after editing .env
- Check connection string has correct password
- See troubleshooting in MONGODB_SETUP.md

### Step 3: Start Frontend (1 minute)

Open **NEW terminal window**:
```powershell
cd "c:\Users\USER\Downloads\ats proj"
npm run dev
```

**Expected output:**
```
➜  Local:   http://localhost:3000/
```

---

## 🎮 Test Your App (2 minutes)

### 1. Open Browser
Go to: **http://localhost:3000**

### 2. Create Account
- Click "Sign In" (top right)
- Click "Don't have an account? Sign up"
- Email: `test@example.com`
- Password: `password123`
- Click "Create Account"

**✅ Success:** You should be logged in automatically

### 3. Analyze Resume
- Paste job description (any text)
- Upload PDF resume
- Click "Analyze Resume"
- Wait ~15 seconds

**✅ Success:** You should see score and detailed analysis

### 4. Check History
- Click "History" button
- See your analysis saved

**✅ Success:** Your analysis is there!

### 5. Test Persistence
- Click "Sign Out"
- Click "Sign In"
- Login with same email/password
- Click "History"

**✅ SUCCESS:** History still there = Database working! 🎉

---

## 🎯 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend shows "ECONNREFUSED" | MongoDB not running - complete Step 1 |
| "Network Error" in browser | Backend not running on port 5000 |
| Can't create account | Check backend terminal for errors |
| "Please login to analyze" | Expected! Register account first |
| Frontend won't start | Port 3000 busy - close other apps |

---

## 📊 Success Indicators

You're fully set up when ALL are true:

- [ ] Backend shows "MongoDB Connected"
- [ ] Frontend accessible at http://localhost:3000
- [ ] Can register account
- [ ] Can login
- [ ] Can analyze resume
- [ ] History persists after logout/login
- [ ] No errors in backend terminal
- [ ] No errors in browser console (F12)

---

## 🎓 What You Built

**Frontend:**
- React + TypeScript
- Beautiful UI with animations
- PDF upload with drag & drop
- Score visualization
- History tracking
- Export to PDF

**Backend:**
- Express + Node.js
- JWT authentication
- MongoDB database
- Gemini AI integration
- Email service
- RESTful API

**Security:**
- API keys hidden
- Passwords hashed
- JWT tokens
- Protected routes
- GitHub-ready

---

## 📚 Learn More

- **SETUP_GUIDE.md** - Detailed setup instructions
- **MONGODB_SETUP.md** - MongoDB help
- **BACKEND_README.md** - API documentation
- **FEATURES_IMPLEMENTED.md** - Full feature list
- **STATUS.md** - Project status

---

## 🆘 Still Stuck?

1. **Check backend terminal** - Look for red errors
2. **Check browser console** - F12 → Console tab
3. **Read error message** - Usually explains the problem
4. **Check MongoDB**:
   ```powershell
   # Test backend
   curl http://localhost:5000/api/health
   
   # Should return: {"status":"OK",...}
   ```

---

## ⚡ TL;DR - Super Quick

```powershell
# 1. Set up MongoDB (use Atlas or install local)
#    See: MONGODB_SETUP.md

# 2. Verify backend (already running)
#    Should see: "MongoDB Connected"

# 3. Start frontend (new terminal)
npm run dev

# 4. Open browser
#    http://localhost:3000

# 5. Register → Analyze → Done!
```

---

**Time Estimate:**
- MongoDB setup: 5 minutes
- Frontend start: 1 minute
- Testing: 2 minutes
- **Total: ~10 minutes** ⚡

**You're almost there! Just MongoDB setup left! 🚀**
