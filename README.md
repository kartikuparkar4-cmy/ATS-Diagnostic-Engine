# 🎯 ATS Resume Analyzer - AI-Powered Career Tool

A comprehensive full-stack application that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS) using advanced AI analysis.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Tech Stack](https://img.shields.io/badge/stack-MERN-orange)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB (local OR MongoDB Atlas account - see [MONGODB_SETUP.md](MONGODB_SETUP.md))
- Gemini API key (already configured in `.env` files)

### Installation & Setup

**📖 Complete setup instructions:** See [SETUP_GUIDE.md](SETUP_GUIDE.md)

**Quick commands:**
```powershell
# 1. Install dependencies
npm install
cd server && npm install && cd ..

# 2. Set up MongoDB (REQUIRED)
# Follow instructions in MONGODB_SETUP.md

# 3. Start backend (Terminal 1)
cd server
npm run dev

# 4. Start frontend (Terminal 2)
npm run dev

# 5. Open browser
# Go to http://localhost:3000
```

---

## 📚 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup and testing instructions
- **[MONGODB_SETUP.md](MONGODB_SETUP.md)** - MongoDB installation (Atlas or Local)
- **[BACKEND_README.md](BACKEND_README.md)** - Backend API documentation
- **[SECURITY_CHECKLIST.md](SECURITY_CHECKLIST.md)** - Security best practices
- **[FEATURES_IMPLEMENTED.md](FEATURES_IMPLEMENTED.md)** - Full feature list

---

## ✨ Features

### 🎨 Frontend Features
- **PDF Upload** - Drag & drop PDF resume upload with text extraction
- **AI Analysis** - Real-time ATS score calculation with detailed feedback
- **Score Visualization** - Beautiful circular progress indicators and category breakdowns
- **Analysis History** - Save and compare multiple resume versions
- **Export Reports** - Download analysis as PDF
- **Mobile Responsive** - Works seamlessly on all devices
- **Dark Theme** - Modern space-themed UI with glassmorphism
- **User Authentication** - Secure login/register with JWT tokens

### 🔒 Backend Features
- **User Authentication** - JWT-based secure login/registration
- **Database Storage** - MongoDB for persistent data
- **Secure API** - API keys hidden from frontend
- **Email Service** - Send analysis reports via email
- **RESTful API** - Complete CRUD operations
- **Password Hashing** - Bcrypt for security

---

## 🛠️ Tech Stack

### Frontend:
- **React 19** + **TypeScript**
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **jsPDF** + **html2canvas** - PDF generation
- **PDF.js** - PDF text extraction
- **Axios** - HTTP client

### Backend:
- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Google Gemini AI** - Resume analysis

---

## 📋 Prerequisites

- **Node.js** (v18+)
- **MongoDB** (local or Atlas)
- **Gemini API Key** ([Get it here](https://aistudio.google.com/app/apikey))
- **Email account** (Gmail recommended for email feature)

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/ats-resume-analyzer.git
cd ats-resume-analyzer
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

### 3. Configure Environment Variables

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (server/.env):**
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/ats-analyzer
JWT_SECRET=your-secret-key-here
GEMINI_API_KEY=your-gemini-api-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

See `.env.example` files for templates.

### 4. Start MongoDB
```bash
# Local MongoDB
mongod

# OR use MongoDB Atlas (cloud)
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# Runs on http://localhost:3000
```

---

## 📖 Documentation

- **[Backend Setup Guide](BACKEND_README.md)** - Complete backend documentation
- **[Security Checklist](SECURITY_CHECKLIST.md)** - Before deploying
- **[Features Documentation](FEATURES_IMPLEMENTED.md)** - All features explained

---

## 🎯 How It Works

1. **Upload Resume** - Upload PDF or paste text
2. **Enter Job Description** - Paste the target job posting
3. **AI Analysis** - Gemini AI analyzes match in real-time
4. **Get Score** - Receive detailed ATS score (0-100%)
5. **View Insights** - See keyword gaps, formatting issues, and recommendations
6. **Save & Compare** - Track improvements over time
7. **Email Report** - Send analysis to your email

---

## 📊 Scoring Algorithm

```
Overall Score = (Keywords × 40%) + (Skills × 30%) + (Experience × 20%) + (Format × 10%)
```

### Score Ranges:
- **85-100%** - Excellent Match ⭐⭐⭐⭐⭐
- **75-84%** - Good Match ⭐⭐⭐⭐
- **65-74%** - Fair Match ⭐⭐⭐
- **50-64%** - Poor Match ⭐⭐
- **Below 50%** - Needs Major Revision ⭐

---

## 🔐 Security

- ✅ JWT authentication with 7-day expiry
- ✅ Password hashing with bcrypt
- ✅ API keys stored securely in backend
- ✅ CORS protection
- ✅ Input validation
- ✅ MongoDB injection prevention

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Analysis
- `POST /api/analysis/analyze` - Analyze resume
- `GET /api/analysis/history` - Get history
- `GET /api/analysis/:id` - Get by ID
- `DELETE /api/analysis/:id` - Delete analysis

### Email
- `POST /api/email/send-analysis` - Send report
- `POST /api/email/test` - Test email config

---

## 📦 Deployment

### Frontend (Vercel/Netlify):
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render/Heroku):
```bash
cd server
npm run build
# Deploy with start command: npm start
```

### Database:
- Use **MongoDB Atlas** for production
- Update `MONGODB_URI` in production `.env`

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- Google Gemini AI for resume analysis
- MongoDB for database
- React & Vite teams
- Open source community

---

## 📞 Support

Having issues? 
- 📧 Email: support@example.com
- 🐛 [Report Bug](https://github.com/yourusername/ats-analyzer/issues)
- 💡 [Request Feature](https://github.com/yourusername/ats-analyzer/issues)

---

**⭐ Star this repo if you found it helpful!**

Made with ❤️ by [Your Name]
