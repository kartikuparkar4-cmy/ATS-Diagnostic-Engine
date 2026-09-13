# 🗄️ MongoDB Setup - Quick Guide

## Why You Need MongoDB

Your ATS Resume Analyzer needs a database to:
- Store user accounts (email, hashed passwords)
- Save analysis history (resumes, scores, reports)
- Enable login across devices
- Keep data persistent (not just browser storage)

**Without MongoDB, the backend server cannot save data!**

---

## ⚡ Fastest Option: MongoDB Atlas (Cloud)

**Recommended for:** Beginners, quick setup, no installation needed
**Cost:** FREE tier available (512MB storage)
**Time:** 5 minutes

### Step-by-Step:

#### 1. Create Account
Go to: https://www.mongodb.com/cloud/atlas/register

- Sign up with email or Google
- Skip the survey (click "Finish" at bottom)

#### 2. Create Free Cluster
- Click "Build a Database"
- Choose **"M0 FREE"** tier
- Select closest region (e.g., US East, Europe, Asia)
- Cluster Name: `ats-cluster` (or keep default)
- Click **"Create"**

#### 3. Set Up Database Access
**Create a database user:**
- Click "Database Access" in left sidebar
- Click "Add New Database User"
- Authentication Method: **Password**
- Username: `atsadmin` (or your choice)
- Password: Click "Autogenerate Secure Password" → **COPY IT!**
- Database User Privileges: "Read and write to any database"
- Click **"Add User"**

#### 4. Set Up Network Access
**Allow connections from anywhere (for development):**
- Click "Network Access" in left sidebar
- Click "Add IP Address"
- Click **"Allow Access from Anywhere"** (0.0.0.0/0)
- Confirm: "Yes, I understand"
- Click **"Confirm"**

#### 5. Get Connection String
- Click "Database" in left sidebar
- Click **"Connect"** button on your cluster
- Choose "Connect your application"
- Driver: **Node.js**
- Version: **5.5 or later**
- Copy the connection string (looks like):
  ```
  mongodb+srv://atsadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```

#### 6. Update Your Server Config
Open `server/.env` and replace the MongoDB line:

**BEFORE:**
```env
MONGODB_URI=mongodb://localhost:27017/ats-analyzer
```

**AFTER:**
```env
MONGODB_URI=mongodb+srv://atsadmin:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/ats-analyzer?retryWrites=true&w=majority
```

**IMPORTANT:** Replace `<password>` with the password you copied in Step 3!

Example:
```env
MONGODB_URI=mongodb+srv://atsadmin:MySecurePass123@cluster0.abc123.mongodb.net/ats-analyzer?retryWrites=true&w=majority
```

#### 7. Restart Backend Server
The backend server will auto-restart when you save `.env`, OR:
- Press `Ctrl+C` in the terminal running the backend
- Run `npm run dev` again

**Expected output:**
```
🚀 Server running on http://localhost:5000
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```

✅ **Done! Your database is ready!**

---

## 🖥️ Alternative: Local MongoDB (Advanced)

**Recommended for:** Developers who want full control, offline access
**Time:** 10-15 minutes

### Windows Installation:

#### 1. Download MongoDB
- Go to: https://www.mongodb.com/try/download/community
- Platform: **Windows**
- Package: **MSI**
- Click **Download**

#### 2. Install MongoDB
- Run the downloaded `.msi` file
- Setup Type: **Complete**
- Service Configuration:
  - ✅ "Install MongoDB as a Service"
  - Service Name: `MongoDB`
  - Data Directory: `C:\Program Files\MongoDB\Server\7.0\data\`
  - Log Directory: `C:\Program Files\MongoDB\Server\7.0\log\`
- ❌ Uncheck "Install MongoDB Compass" (optional GUI, skip for now)
- Click **Install**

#### 3. Verify Installation
Open PowerShell:
```powershell
# Check if MongoDB is installed
mongod --version

# Should show: db version v7.x.x
```

#### 4. Start MongoDB Service
```powershell
# Start MongoDB (if not already running)
net start MongoDB
```

#### 5. Verify MongoDB is Running
```powershell
# Connect to MongoDB shell
mongosh

# Should show:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017/
# Using MongoDB: 7.x.x

# Exit with:
exit
```

#### 6. Your `.env` is Already Correct!
The default `server/.env` already has:
```env
MONGODB_URI=mongodb://localhost:27017/ats-analyzer
```

✅ **No changes needed! Just restart the backend server.**

### macOS Installation:

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongosh
```

### Linux (Ubuntu/Debian):

```bash
# Import MongoDB GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg

# Add MongoDB repository
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update packages
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongosh
```

---

## ✅ Verification

After setup (Atlas OR Local), verify MongoDB is connected:

### 1. Check Backend Logs
Look at the terminal running `npm run dev` in the server folder:

**✅ Success:**
```
🚀 Server running on http://localhost:5000
✅ MongoDB Connected: localhost:27017
```
OR
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```

**❌ Error:**
```
❌ MongoDB Connection Error: ECONNREFUSED
```
- **Solution**: MongoDB not running (local) OR wrong connection string (Atlas)

### 2. Test API Health
```powershell
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{"status":"OK","message":"ATS Backend Server Running"}
```

### 3. Try Registering a User
Open browser → http://localhost:3000 → Click "Sign In" → Create account

**✅ Success = MongoDB is working!**

---

## 🔍 Troubleshooting

### Issue: "ECONNREFUSED" Error

**For Local MongoDB:**
```powershell
# Check if MongoDB service is running
net start MongoDB

# OR start it manually
mongod
```

**For MongoDB Atlas:**
- Check connection string has correct password
- No `<password>` placeholder remaining
- Check Network Access allows your IP (0.0.0.0/0 for testing)
- Check Database User has "Read and write" permissions

### Issue: "Authentication failed"

**MongoDB Atlas:**
- Username/password in connection string is wrong
- Go to "Database Access" → Edit user → Reset password
- Update `server/.env` with new password

### Issue: "Network timeout"

**MongoDB Atlas:**
- Go to "Network Access"
- Add IP Address → "Allow Access from Anywhere" (0.0.0.0/0)
- Wait 2 minutes for changes to apply

### Issue: Backend starts but shows no MongoDB message

**Check your `server/.env` file:**
- Make sure `MONGODB_URI` line exists
- No typos in the connection string
- Save the file and restart backend

---

## 🎯 Recommended: MongoDB Atlas

For this project, **MongoDB Atlas is recommended** because:
- ✅ No installation needed
- ✅ Works on any OS (Windows, Mac, Linux)
- ✅ Free tier available
- ✅ Automatic backups
- ✅ Easy to share (just connection string)
- ✅ Production-ready

**Local MongoDB is better if:**
- You want offline development
- You're already familiar with MongoDB
- You need full control over data

---

## 📊 What Gets Stored in MongoDB?

### Users Collection:
```json
{
  "_id": "ObjectId(...)",
  "email": "user@example.com",
  "password": "$2b$10$hashed...",  // Hashed with bcrypt
  "name": "John Doe",
  "createdAt": "2026-09-11T10:30:00.000Z"
}
```

### Analyses Collection:
```json
{
  "_id": "ObjectId(...)",
  "userId": "ObjectId(...)",
  "title": "Software Engineer at Google",
  "jobDescription": "We are looking for...",
  "resume": "John Doe\nSoftware Engineer...",
  "result": "## ATS Score: 85%\n...",
  "score": 85,
  "keywordScore": 90,
  "skillsScore": 85,
  "experienceScore": 80,
  "formatScore": 95,
  "createdAt": "2026-09-11T10:35:00.000Z"
}
```

---

## 🆘 Still Having Issues?

### Check These:
1. **Backend terminal** - Any red error messages?
2. **Connection string** - Correctly copied and password replaced?
3. **Network** - Internet connection working? (for Atlas)
4. **Firewall** - Blocking port 27017? (for local)

### Quick Test Commands:
```powershell
# Test backend is running
curl http://localhost:5000/api/health

# Test MongoDB connection (if local)
mongosh

# Check backend logs
# (Look at terminal running 'npm run dev' in server folder)
```

---

## ✅ Next Steps

Once MongoDB shows "Connected":

1. ✅ MongoDB is set up
2. ✅ Backend connected to database
3. ✅ Ready to register users
4. ✅ Ready to save analyses
5. ✅ Ready to use the full app!

**Continue with SETUP_GUIDE.md for complete testing instructions!**
