import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Briefcase, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  ChevronRight,
  Loader2,
  Sparkles,
  ArrowRight,
  Download,
  Printer,
  History,
  LayoutDashboard,
  Target,
  Cpu,
  Globe as GlobeIcon,
  MessageSquare,
  Send,
  X,
  Info,
  Lightbulb
} from 'lucide-react';
import Markdown from 'react-markdown';
import { analyzeResume, chatWithAI } from './services/gemini';
import { WorldMap, LocationData } from './components/WorldMap';
import { Globe } from './components/Globe';
import { FormattingTipsOverlay } from './components/FormattingTipsOverlay';
import { ScoreVisualization } from './components/ScoreVisualization';
import { saveToHistory, getHistory, deleteHistoryItem } from './utils/storage';
import { authAPI, analysisAPI, emailAPI } from './services/api';

const Nebula = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute pointer-events-none blur-[100px] opacity-20 ${className}`}>
      <div className="absolute inset-0 bg-indigo-500/30 rounded-full mix-blend-screen" />
      <div className="absolute inset-0 bg-purple-500/20 rounded-full translate-x-1/4 mix-blend-screen" />
      <div className="absolute inset-0 bg-blue-500/20 rounded-full -translate-y-1/4 mix-blend-screen" />
    </div>
  );
};

const SpiralGalaxy = ({ className = "", color = "rgba(168, 85, 247, 0.3)" }: { className?: string, color?: string }) => {
  return (
    <div className={`galaxy-spiral ${className}`}>
      <div className="galaxy-dust" style={{ background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)` }} />
      <div className="galaxy-arms">
        {[...Array(4)].map((_, arm) => (
          <div key={arm} style={{ transform: `rotate(${arm * 90}deg)` }} className="absolute inset-0">
            {[...Array(40)].map((_, i) => {
              const distance = 15 + i * 5;
              const angle = i * 12;
              const x = Math.cos((angle * Math.PI) / 180) * distance;
              const y = Math.sin((angle * Math.PI) / 180) * distance;
              const size = Math.random() * 1.5 + 0.5;
              const starColor = i % 5 === 0 ? '#e0f2fe' : i % 7 === 0 ? '#fae8ff' : '#ffffff';
              return (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: starColor,
                    opacity: Math.max(0.1, 1 - i / 40),
                    boxShadow: i % 10 === 0 ? `0 0 ${size * 4}px ${starColor}` : 'none',
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="galaxy-core" />
    </div>
  );
};

const Stars = () => {
  return (
    <div className="stars-container no-print">
      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      
      {/* Background Nebulae */}
      <Nebula className="w-[800px] h-[600px] -top-40 -left-40 rotate-12 opacity-10" />
      <Nebula className="w-[600px] h-[400px] bottom-0 right-0 -rotate-12 opacity-10" />
      
      {/* Galaxies */}
      <div className="galaxy galaxy-purple animate-galaxy" style={{ top: '10%', left: '5%', opacity: 0.1 }} />
      <div className="galaxy galaxy-blue animate-galaxy" style={{ bottom: '15%', right: '10%', animationDelay: '-5s', opacity: 0.08 }} />
      <div className="galaxy galaxy-gold animate-galaxy" style={{ top: '60%', left: '40%', animationDelay: '-10s', opacity: 0.05 }} />
      
      {[...Array(200)].map((_, i) => {
        const size = Math.random() * 2 + 0.5;
        const colors = ['#ffffff', '#e0f2fe', '#fef9c3', '#fae8ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              boxShadow: size > 2 ? `0 0 ${size * 2}px ${color}` : 'none',
              '--duration': `${Math.random() * 3 + 2}s`,
              opacity: Math.random() * 0.7 + 0.3,
            } as React.CSSProperties}
          />
        );
      })}
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={`shining-bg-${i}`}
          animate={{ 
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{ 
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute rounded-full bg-white blur-[0.5px]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            backgroundColor: i % 10 === 0 ? '#818cf8' : i % 15 === 0 ? '#fae8ff' : '#ffffff',
            boxShadow: '0 0 15px 2px rgba(255, 255, 255, 0.4)',
            zIndex: 0
          }}
        />
      ))}
      {[...Array(15)].map((_, i) => (
        <div
          key={`shooting-${i}`}
          className="shooting-star"
          style={{
            top: `${Math.random() * 60}%`,
            left: `${Math.random() * 100 + 20}%`,
            '--duration': `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 20}s`,
            width: `${Math.random() * 150 + 100}px`,
            opacity: Math.random() * 0.5 + 0.3,
          } as React.CSSProperties}
        />
      ))}
      <div className="glow-overlay" />
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'history' | 'score' | 'map'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [showFormattingTips, setShowFormattingTips] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const reportRef = React.useRef<HTMLDivElement>(null);
  
  const [history, setHistory] = useState<{id: string, date: string, score: string, title: string, fullResult: string, jobDescription?: string, resume?: string}[]>([]);

  // Load history from localStorage on mount
  React.useEffect(() => {
    const loadedHistory = getHistory();
    setHistory(loadedHistory);
  }, []);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<typeof history[0] | null>(null);

  const ReportRenderer = ({ content }: { content: string }) => {
    return (
      <div className="markdown-body">
        <Markdown components={{
          table: ({ children }) => (
            <div className="overflow-x-auto my-8 rounded-2xl border border-slate-800 shadow-sm">
              <table className="w-full text-left border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-slate-900/50 text-slate-400 font-bold text-[10px] uppercase tracking-widest">{children}</thead>,
          th: ({ children }) => <th className="p-4 border-b border-slate-800">{children}</th>,
          td: ({ children }) => <td className="p-4 border-b border-slate-800 text-sm font-medium text-slate-300">{children}</td>,
          h1: ({ children }) => <h1 className="font-display text-3xl font-bold text-white mb-8 pb-4 border-b border-slate-800">{children}</h1>,
          h2: ({ children }) => <h2 className="font-display text-xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
            {children}
          </h2>,
          h3: ({ children }) => <h3 className="font-display text-sm font-bold text-indigo-400 uppercase tracking-widest mt-8 mb-4">{children}</h3>,
          ul: ({ children }) => <ul className="space-y-3 my-6 list-none p-0">{children}</ul>,
          li: ({ children }) => (
            <li className="flex items-start gap-4 p-4 bg-slate-900/30 rounded-2xl text-sm font-medium text-slate-400 border border-slate-800/50">
              <div className="mt-1 w-5 h-5 rounded-full bg-slate-800 shadow-sm flex items-center justify-center shrink-0">
                <ChevronRight className="w-3 h-3 text-indigo-400" />
              </div>
              <span>{children}</span>
            </li>
          ),
          p: ({ children }) => <p className="text-slate-400 leading-relaxed mb-6">{children}</p>,
          blockquote: ({ children }) => (
            <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-2xl my-8 italic text-indigo-300 text-sm leading-relaxed">
              {children}
            </div>
          )
        }}>
          {content}
        </Markdown>
      </div>
    );
  };
  
  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Auth State - Real Authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Check if user is logged in on mount
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      setUserEmail(JSON.parse(user).email);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const data = await authAPI.login(userEmail, password);
      
      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setIsLoggedIn(true);
      setIsLoginModalOpen(false);
      setPassword('');
    } catch (error: any) {
      setAuthError(error.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const data = await authAPI.register(userEmail, password);
      
      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setIsLoggedIn(true);
      setIsLoginModalOpen(false);
      setPassword('');
    } catch (error: any) {
      setAuthError(error.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserEmail('');
    setPassword('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setIsUploadingFile(true);
    setError(null);

    try {
      const text = await extractTextFromFile(file);
      setResume(text);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to read file. Please try a different format or paste text directly.');
      setUploadedFileName(null);
      setResume('');
    } finally {
      setIsUploadingFile(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
      setError('Only PDF files are supported. Please upload a PDF file.');
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setError('File size exceeds 10MB. Please upload a smaller PDF file.');
      return;
    }

    setUploadedFileName(file.name);
    setIsUploadingFile(true);
    setError(null);

    try {
      const text = await extractTextFromFile(file);
      setResume(text);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to read file. Please try a different PDF.');
      setUploadedFileName(null);
      setResume('');
    } finally {
      setIsUploadingFile(false);
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'pdf' || file.type === 'application/pdf') {
      // Handle PDF files only
      try {
        const pdfjsLib = await import('pdfjs-dist');
        
        // Use the worker from node_modules instead of CDN
        const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;
        
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        
        let fullText = '';
        let hasText = false;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          
          if (textContent.items.length > 0) {
            hasText = true;
            const pageText = textContent.items
              .map((item: any) => {
                // Handle different item types
                if ('str' in item) {
                  return item.str;
                }
                return '';
              })
              .filter((text: string) => text.trim().length > 0)
              .join(' ');
            
            fullText += pageText + '\n\n';
          }
        }

        if (!hasText || fullText.trim().length === 0) {
          throw new Error('This PDF appears to be empty or contains only images. Please use a PDF with selectable text.');
        }

        return fullText.trim();
      } catch (error) {
        console.error('PDF parsing error:', error);
        if (error instanceof Error && error.message.includes('empty or contains only images')) {
          throw error;
        }
        throw new Error('Failed to parse PDF file. The PDF might be password-protected, corrupted, or contain only scanned images.');
      }
    } else {
      throw new Error('Only PDF files are supported. Please upload a PDF file.');
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await chatWithAI({
        jobDescription: jobDescription || undefined,
        resume: resume || undefined,
        analysis: result || undefined
      }, userMsg);
      
      setChatMessages(prev => [...prev, { role: 'ai', text: response || 'I am not sure how to answer that.' }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I encountered an error.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    
    setIsExportingPDF(true);
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;
      
      // Clone the report element to avoid modifying the DOM
      const element = reportRef.current;
      
      // Capture the element as canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#020617'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const fileName = `ATS_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      setError('Failed to export PDF. Please try again.');
    } finally {
      setIsExportingPDF(false);
    }
  };

  const loadSampleData = () => {
    setJobDescription(`Software Engineer (React/TypeScript)
Role Overview:
We are looking for a Senior React Developer to join our core product team. You will be responsible for building high-performance web applications using React, TypeScript, and Tailwind CSS.

Requirements:
- 5+ years of experience with React.js
- Strong proficiency in TypeScript and modern JavaScript (ES6+)
- Experience with state management (Redux, Zustand, or Context API)
- Knowledge of Tailwind CSS and responsive design
- Familiarity with CI/CD pipelines and unit testing (Jest/Vitest)
- Excellent communication skills and ability to work in an agile team.`);

    setResume(`John Doe - Senior Frontend Engineer
Email: john.doe@example.com // Phone: 555-0199

Summary:
Experienced Frontend Developer with 6 years of expertise in building scalable web applications. Passionate about clean code and user experience.

Skills:
React, JavaScript, HTML5, CSS3, Git, Agile, Team Leadership.

Experience:
WebTech Solutions | 2019 - Present
- Developed various features using React and Redux.
- Worked on improving site performance.
- Collaborated with designers to implement UI components.

Previous Dev Corp | 2017 - 2019
- Built websites for clients using HTML/CSS and JS.
- Maintained legacy codebases.`);
    setError(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!jobDescription || !resume) {
      setError('Please provide both a Job Description and a Resume.');
      return;
    }

    // Check if user is logged in
    if (!isLoggedIn) {
      setError('Please login to analyze your resume.');
      setIsLoginModalOpen(true);
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setAnalysisProgress(0);
    setAnalysisStep('Initializing analysis...');

    try {
      // Simulate progress steps
      const progressSteps = [
        { progress: 15, step: 'Parsing resume content...' },
        { progress: 30, step: 'Extracting keywords from job description...' },
        { progress: 45, step: 'Analyzing skill matches...' },
        { progress: 60, step: 'Calculating ATS score...' },
        { progress: 75, step: 'Identifying improvements...' },
        { progress: 90, step: 'Generating detailed report...' }
      ];

      let currentStep = 0;
      const progressInterval = setInterval(() => {
        if (currentStep < progressSteps.length) {
          setAnalysisProgress(progressSteps[currentStep].progress);
          setAnalysisStep(progressSteps[currentStep].step);
          currentStep++;
        }
      }, 2000);

      // Call backend API instead of direct Gemini
      const response = await analysisAPI.analyze(jobDescription, resume);
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setAnalysisStep('Complete!');
      
      setTimeout(() => {
        setResult(response.analysis.result || 'No analysis generated.');
        
        // Add to local history
        const newEntry = {
          id: response.analysis.id,
          date: new Date().toISOString().split('T')[0],
          score: response.analysis.score + '%',
          title: response.analysis.title,
          fullResult: response.analysis.result || '',
          jobDescription,
          resume
        };
        setHistory([newEntry, ...history]);
        setView('score');
      }, 500);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to analyze resume. Please check your connection and try again.');
      setAnalysisProgress(0);
      setAnalysisStep('');
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen dark-bg font-sans text-slate-200 relative overflow-hidden">
      <Stars />
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 bg-slate-950/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/40 glow-indigo">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white">ATS<span className="text-indigo-400">Pro</span></span>
            </div>
            
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <button 
                onClick={() => setView('home')}
                className={`text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors ${view === 'home' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setView('history')}
                className={`text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors ${view === 'history' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
              >
                Activity
              </button>
              <button 
                onClick={() => setView('score')}
                className={`text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors ${view === 'score' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
              >
                ATS Score
              </button>
              <button 
                onClick={() => setView('map')}
                className={`text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors ${view === 'map' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
              >
                Company Map
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text"
                placeholder="Search diagnostics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900/50 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-xs font-medium text-slate-300 focus:ring-2 focus:ring-indigo-500/20 outline-none w-48 xl:w-64 transition-all"
              />
            </div>
            {isLoggedIn ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white border border-indigo-400/30">
                  {userEmail.substring(0, 2).toUpperCase()}
                </div>
                <button 
                  onClick={handleLogout}
                  className="hidden sm:block text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-white text-slate-950 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-slate-200 transition-all shadow-lg shadow-white/5"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Hero Section */}
              <div className="text-center mb-16 relative">
                {/* Moon Element */}
                <motion.div
                  initial={{ opacity: 0, x: 50, y: -50 }}
                  animate={{ 
                    opacity: 0.4, 
                    x: 0, 
                    y: 0,
                    rotate: [0, 2, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="moon absolute -top-20 -right-10 hidden lg:block"
                />

                {/* Mars-like Planet */}
                <motion.div
                  initial={{ opacity: 0, x: -100, y: 100 }}
                  animate={{ opacity: 0.5, x: 0, y: 0 }}
                  transition={{ duration: 3, delay: 0.5 }}
                  className="planet planet-mars absolute top-40 -left-20 hidden xl:block"
                />

                {/* Saturn-like Planet */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  transition={{ duration: 4, delay: 1 }}
                  className="planet planet-saturn absolute -bottom-20 right-20 hidden xl:block"
                />

                {/* Neptune-like Planet */}
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 0.3, y: 0 }}
                  transition={{ duration: 5, delay: 1.5 }}
                  className="planet planet-neptune absolute top-0 left-1/4 hidden lg:block"
                />

                {/* Hero Galaxy */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
                  transition={{ duration: 3, delay: 2 }}
                  className="galaxy galaxy-purple absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[80px] hidden lg:block"
                  style={{ transform: 'rotate(-15deg)' }}
                />

                <Nebula className="w-[500px] h-[300px] top-0 left-1/2 -translate-x-1/2 opacity-20" />

                <SpiralGalaxy className="absolute -top-20 -left-20 hidden xl:block scale-75 opacity-40" color="rgba(99, 102, 241, 0.4)" />
                <SpiralGalaxy className="absolute bottom-0 -right-40 hidden xl:block scale-50 opacity-30" color="rgba(168, 85, 247, 0.3)" />
                <SpiralGalaxy className="absolute top-1/2 left-1/4 hidden lg:block scale-[0.3] opacity-20" color="rgba(59, 130, 246, 0.3)" />

                {/* Shining Stars */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={`shining-${i}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{ 
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 5
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      boxShadow: '0 0 15px 2px rgba(255, 255, 255, 0.5)'
                    }}
                  />
                ))}

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border border-indigo-500/20 backdrop-blur-sm"
                >
                  <Sparkles className="w-3 h-3" />
                  AI-Powered Diagnostic Engine
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                  className="font-display text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[1.1]"
                >
                  Beat the <span className="gradient-text">ATS Algorithm</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                >
                  Upload your resume and the job description to get a mechanical audit of your match score, keyword gaps, and formatting red flags.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 flex justify-center gap-4"
                >
                  <button
                    onClick={loadSampleData}
                    className="px-8 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-300 font-bold text-sm hover:bg-slate-800 transition-all shadow-xl flex items-center gap-3 backdrop-blur-sm group"
                  >
                    <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                      <Zap className="w-4 h-4 text-amber-500" />
                    </div>
                    Try Sample Data
                  </button>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs */}
                <div className="lg:col-span-12 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass-card rounded-3xl p-8 hover:border-slate-700/50 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 group-hover:glow-amber transition-all">
                            <Briefcase className="w-5 h-5 text-amber-500" />
                          </div>
                          <h2 className="font-display font-bold text-white">Job Description</h2>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Required</span>
                      </div>
                      <textarea
                        className="input-field w-full h-64 resize-none placeholder:text-slate-600"
                        placeholder="Paste the full job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                      />
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="glass-card rounded-3xl p-8 hover:border-slate-700/50 transition-colors group relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 group-hover:glow-indigo transition-all">
                            <FileText className="w-5 h-5 text-indigo-400" />
                          </div>
                          <div>
                            <h2 className="font-display font-bold text-white">Your Resume</h2>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">PDF Format Only</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowFormattingTips(!showFormattingTips)}
                            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              showFormattingTips
                                ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/30'
                                : 'bg-slate-900/80 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/10 hover:border-indigo-500/50 hover:text-white'
                            }`}
                            title="Toggle ATS Formatting Mistakes & Guidelines"
                          >
                            <Lightbulb className={`w-3.5 h-3.5 ${showFormattingTips ? 'text-white' : 'text-amber-400'}`} />
                            <span>Formatting Tips</span>
                            <span className={`w-1.5 h-1.5 rounded-full ${showFormattingTips ? 'bg-emerald-400' : 'bg-indigo-400 animate-pulse'}`} />
                          </button>
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        
                        {!resume ? (
                          <div 
                            onClick={() => !isUploadingFile && fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${
                              isUploadingFile 
                                ? 'cursor-wait border-slate-800' 
                                : isDragging
                                  ? 'cursor-pointer border-indigo-500 bg-indigo-500/10 scale-[1.02]'
                                  : 'cursor-pointer border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/5'
                            }`}
                          >
                            {isUploadingFile ? (
                              <>
                                <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mb-4" />
                                <p className="text-slate-400 font-medium">Processing PDF...</p>
                                <p className="text-slate-600 text-xs mt-2">This may take a moment</p>
                              </>
                            ) : isDragging ? (
                              <>
                                <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-4 animate-pulse">
                                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  </svg>
                                </div>
                                <p className="text-indigo-400 font-bold mb-2">Drop your PDF here</p>
                                <p className="text-indigo-300 text-sm">Release to upload</p>
                              </>
                            ) : (
                              <>
                                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-all">
                                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  </svg>
                                </div>
                                <p className="text-white font-bold mb-2">Click to upload PDF</p>
                                <p className="text-slate-500 text-sm">or drag and drop your resume here</p>
                                <p className="text-slate-600 text-xs mt-4">PDF files only • Max 10MB</p>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-64 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20 shrink-0">
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white font-bold text-sm truncate">{uploadedFileName}</p>
                                  <p className="text-slate-500 text-xs mt-1">{resume.length} characters extracted</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setUploadedFileName(null);
                                  setResume('');
                                }}
                                className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 transition-colors shrink-0"
                                title="Remove file"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                            
                            <div className="bg-slate-950/50 rounded-xl p-4 flex-1 overflow-y-auto">
                              <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                                {resume.substring(0, 500)}{resume.length > 500 ? '...' : ''}
                              </p>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              Upload Different PDF
                            </button>
                          </div>
                        )}
                        
                        {!resume && !showFormattingTips && !isUploadingFile && (
                          <div className="mt-4 space-y-2">
                            <div className="text-xs text-slate-500 flex items-start gap-1.5">
                              <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                              <span>Avoid tables, graphics, & non-standard fonts in your PDF</span>
                            </div>
                            <div className="text-xs text-amber-400/70 flex items-start gap-1.5 bg-amber-500/5 border border-amber-500/10 rounded-lg p-2">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span>PDF must contain selectable text (not scanned images)</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Formatting Tips Overlay */}
                      <AnimatePresence>
                        {showFormattingTips && (
                          <FormattingTipsOverlay
                            isOpen={showFormattingTips}
                            onClose={() => setShowFormattingTips(false)}
                            onApplyTemplate={(template) => {
                              setResume(template);
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-display font-bold text-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 hover:glow-indigo active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Analyzing ({analysisProgress}%)...
                      </>
                    ) : (
                      <>
                        Analyze Match
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-2xl"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-indigo-400">{analysisStep}</span>
                        <span className="text-sm font-bold text-indigo-300">{analysisProgress}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${analysisProgress}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                        <Cpu className="w-4 h-4 animate-pulse text-indigo-400" />
                        <span>AI processing in progress...</span>
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-start gap-3 text-rose-400"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p className="text-sm font-medium">{error}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {view === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              {!selectedHistoryItem ? (
                <>
                  <div className="flex items-center justify-between mb-12">
                    <h2 className="font-display text-4xl font-bold text-white">Activity History</h2>
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-bold uppercase tracking-widest">
                      <History className="w-4 h-4" />
                      {history.length} Diagnostics
                    </div>
                  </div>

                  <div className="space-y-4">
                    {history.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ x: 10 }}
                        onClick={() => setSelectedHistoryItem(item)}
                        className="glass-card p-6 rounded-2xl flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center font-display font-bold text-indigo-400">
                            {item.score}
                          </div>
                          <div>
                            <h3 className="text-white font-bold group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                            <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">{item.date}</p>
                          </div>
                        </div>
                        <button className="p-2 text-slate-600 hover:text-white transition-colors">
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-8">
                  <button 
                    onClick={() => setSelectedHistoryItem(null)}
                    className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Back to History
                  </button>

                  <div className="glass-card rounded-[2.5rem] p-10 glow-indigo">
                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-800">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                          <span className="font-display font-bold text-2xl text-indigo-400">{selectedHistoryItem.score}</span>
                        </div>
                        <div>
                          <h2 className="text-2xl font-display font-bold text-white">{selectedHistoryItem.title}</h2>
                          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-1">{selectedHistoryItem.date}</p>
                        </div>
                      </div>
                      <button 
                        onClick={handleExportPDF}
                        disabled={isExportingPDF}
                        className="flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-200 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-white/5 active:scale-95 no-print disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isExportingPDF ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Exporting...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Export PDF
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                      <div className="glass-card p-6 rounded-3xl border-indigo-500/20 bg-indigo-500/5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                            <Target className="w-4 h-4 text-indigo-400" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match Score</span>
                        </div>
                        <div className="text-4xl font-display font-bold text-white">
                          {selectedHistoryItem.fullResult.match(/(\d+)%/) ? selectedHistoryItem.fullResult.match(/(\d+)%/)![0] : 'N/A'}
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500" 
                            style={{ width: selectedHistoryItem.fullResult.match(/(\d+)%/) ? selectedHistoryItem.fullResult.match(/(\d+)%/)![0] : '0%' }}
                          />
                        </div>
                      </div>

                      <div className="glass-card p-6 rounded-3xl border-amber-500/20 bg-amber-500/5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                            <Zap className="w-4 h-4 text-amber-400" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Keyword Match</span>
                        </div>
                        <div className="text-xl font-display font-bold text-white">
                          {selectedHistoryItem.fullResult.includes('High') ? 'High Match' : selectedHistoryItem.fullResult.includes('Medium') ? 'Medium Match' : 'Low Match'}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">Based on semantic relevance</p>
                      </div>

                      <div className="glass-card p-6 rounded-3xl border-emerald-500/20 bg-emerald-500/5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Formatting</span>
                        </div>
                        <div className="text-xl font-display font-bold text-white">
                          {selectedHistoryItem.fullResult.includes('Pass') ? 'ATS Optimized' : 'Needs Fixes'}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">OCR readability check</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 text-rose-400">
                          <AlertCircle className="w-5 h-5" />
                          <h3 className="font-display font-bold uppercase tracking-widest text-sm">Identified Mistakes</h3>
                        </div>
                        <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-6 min-h-[200px]">
                          <div className="prose prose-invert prose-sm max-w-none">
                            <Markdown>
                              {selectedHistoryItem.fullResult.includes('Mistakes') 
                                ? selectedHistoryItem.fullResult.split('Mistakes')[1].split('##')[0]
                                : "No specific mistakes identified in this diagnostic."}
                            </Markdown>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-3 text-emerald-400">
                          <Lightbulb className="w-5 h-5" />
                          <h3 className="font-display font-bold uppercase tracking-widest text-sm">Recommended Solutions</h3>
                        </div>
                        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 min-h-[200px]">
                          <div className="prose prose-invert prose-sm max-w-none">
                            <Markdown>
                              {selectedHistoryItem.fullResult.includes('Solutions') 
                                ? selectedHistoryItem.fullResult.split('Solutions')[1].split('##')[0]
                                : "No specific solutions identified. Review the full report for details."}
                            </Markdown>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 pt-12 border-t border-slate-800">
                      <h3 className="font-display font-bold text-white mb-6 flex items-center gap-2">
                        <Info className="w-5 h-5 text-indigo-400" />
                        Full Diagnostic Report
                      </h3>
                      <div className="prose prose-invert max-w-none">
                        <ReportRenderer content={selectedHistoryItem.fullResult} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {view === 'score' && (
            <motion.div
              key="score"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full"
            >
              {!result && !isAnalyzing ? (
                <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-[2.5rem] p-12 text-center">
                  <div className="w-20 h-20 bg-slate-900 rounded-3xl shadow-sm flex items-center justify-center mb-8 border border-slate-800">
                    <Target className="w-10 h-10 text-slate-700" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-3">No Score Generated</h3>
                  <p className="text-slate-500 max-w-xs mx-auto">
                    Run a diagnostic on the Home page to see your ATS score breakdown.
                  </p>
                  <button 
                    onClick={() => setView('home')}
                    className="mt-8 text-indigo-400 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                  >
                    Go to Home
                  </button>
                </div>
              ) : isAnalyzing ? (
                <div className="h-full min-h-[600px] flex flex-col items-center justify-center glass-card rounded-[2.5rem] p-12">
                  <div className="w-full max-w-md space-y-12">
                    <div className="text-center space-y-2">
                      <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20" />
                        <div className="relative w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center border border-indigo-500/20">
                          <Cpu className="w-10 h-10 text-indigo-400 animate-pulse" />
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-2xl text-white">Processing Resume</h3>
                      <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Step 2 of 4</p>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-indigo-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full glow-indigo" ref={reportRef}>
                  <div className="bg-slate-950/80 px-8 py-6 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-display font-bold text-lg">Diagnostic Report</h3>
                        <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Generated by ATSPro AI</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 no-print">
                      <button 
                        onClick={handleExportPDF}
                        disabled={isExportingPDF}
                        className="flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-200 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-white/5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isExportingPDF ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Exporting...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Export PDF
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-10 overflow-y-auto max-h-[800px] prose prose-invert max-w-none">
                    {/* Score Visualization */}
                    <ScoreVisualization 
                      score={result.match(/Overall Match Score:\s*(\d+)%/) ? parseInt(result.match(/Overall Match Score:\s*(\d+)%/)![1]) : (result.match(/(\d+)%/) ? parseInt(result.match(/(\d+)%/)![1]) : 0)}
                      keywordScore={result.match(/Required Keywords.*?(\d+)%/) ? parseInt(result.match(/Required Keywords.*?(\d+)%/)![1]) : 0}
                      skillsScore={result.match(/Skills Alignment.*?(\d+)%/) ? parseInt(result.match(/Skills Alignment.*?(\d+)%/)![1]) : 0}
                      experienceScore={result.match(/Experience Level.*?(\d+)%/) ? parseInt(result.match(/Experience Level.*?(\d+)%/)![1]) : 0}
                      formatScore={result.match(/Formatting Quality.*?(\d+)%/) ? parseInt(result.match(/Formatting Quality.*?(\d+)%/)![1]) : 0}
                    />

                    {/* Summary Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 no-print">
                      <div className="glass-card p-6 rounded-3xl border-indigo-500/20 bg-indigo-500/5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                            <Target className="w-4 h-4 text-indigo-400" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match Score</span>
                        </div>
                        <div className="text-4xl font-display font-bold text-white">
                          {result.match(/(\d+)%/) ? result.match(/(\d+)%/)![0] : 'N/A'}
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500" 
                            style={{ width: result.match(/(\d+)%/) ? result.match(/(\d+)%/)![0] : '0%' }}
                          />
                        </div>
                      </div>

                      <div className="glass-card p-6 rounded-3xl border-amber-500/20 bg-amber-500/5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                            <Zap className="w-4 h-4 text-amber-400" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Keyword Match</span>
                        </div>
                        <div className="text-xl font-display font-bold text-white">
                          {result.includes('High') ? 'High Match' : result.includes('Medium') ? 'Medium Match' : 'Low Match'}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">Based on semantic relevance</p>
                      </div>

                      <div className="glass-card p-6 rounded-3xl border-emerald-500/20 bg-emerald-500/5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Formatting</span>
                        </div>
                        <div className="text-xl font-display font-bold text-white">
                          {result.includes('Pass') ? 'ATS Optimized' : 'Needs Fixes'}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">OCR readability check</p>
                      </div>
                    </div>

                    <ReportRenderer content={result} />
                  </div>
                </div>
              )}
            </motion.div>
          )}
          {view === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-display text-4xl font-bold text-white mb-4">Global Opportunity Map</h2>
                <p className="text-slate-400">
                  Explore major tech hubs and company concentrations worldwide. Our AI tracks hiring trends across 15+ global markets to help you target your applications.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-8">
                  <Globe />
                  <div className="mt-8">
                    <WorldMap onLocationSelect={setSelectedLocation} />
                  </div>
                </div>
                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    {selectedLocation ? (
                      <motion.div
                        key="location-detail"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="glass-card p-8 rounded-[2rem] glow-indigo border-indigo-500/30"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-xl font-display font-bold text-white">{selectedLocation.name}</h3>
                            <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">{selectedLocation.count} Active Companies</p>
                          </div>
                          <button 
                            onClick={() => setSelectedLocation(null)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <X className="w-4 h-4 text-slate-400" />
                          </button>
                        </div>

                        <div className="space-y-4">
                          {selectedLocation.companies.map((company, idx) => (
                            <div key={idx} className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all group">
                              <div className="flex justify-between items-start mb-2">
                                <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{company.name}</div>
                                <div className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">{company.salary}</div>
                              </div>
                              <div className="text-xs font-medium text-slate-300 mb-1">{company.role}</div>
                              <p className="text-[10px] text-slate-500 leading-relaxed">{company.description}</p>
                            </div>
                          ))}
                        </div>
                        
                        <button className="w-full mt-6 py-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded-xl text-xs font-bold transition-all border border-indigo-500/20">
                          View All Opportunities
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="market-insights"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="glass-card p-8 rounded-[2rem] glow-indigo"
                      >
                        <h3 className="text-xl font-display font-bold text-white mb-4">Market Insights</h3>
                        <div className="space-y-4">
                          {[
                            { city: 'San Francisco', growth: '+12%', companies: '1.2k+' },
                            { city: 'London', growth: '+8%', companies: '850+' },
                            { city: 'Bangalore', growth: '+15%', companies: '650+' },
                            { city: 'Tokyo', growth: '+5%', companies: '540+' }
                          ].map((item) => (
                            <div key={item.city} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                              <div>
                                <div className="text-sm font-bold text-white">{item.city}</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Tech Hub</div>
                              </div>
                              <div className="text-right">
                                <div className="text-emerald-400 text-xs font-bold">{item.growth}</div>
                                <div className="text-[10px] text-slate-500">{item.companies} jobs</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="mt-6 text-[10px] text-slate-500 text-center italic">Click a hub on the map for detailed insights</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="glass-card p-8 rounded-[2rem] border-indigo-500/20 bg-indigo-500/5">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-5 h-5 text-indigo-400" />
                      <h4 className="text-white font-bold">AI Recommendation</h4>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Based on your profile, we recommend targeting the <strong>London</strong> and <strong>Berlin</strong> markets where demand for your specific skill set has increased by 24% this quarter.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  { label: 'Active Hubs', value: '15+', icon: GlobeIcon },
                  { label: 'Tracked Companies', value: '12,400+', icon: Briefcase },
                  { label: 'Hiring Velocity', value: 'High', icon: Zap },
                ].map((stat, i) => (
                  <div key={i} className="glass-card p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                      <stat.icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-white font-display font-bold text-xl">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isLoginModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md glass-card rounded-[2.5rem] p-10 glow-indigo"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-white mb-2">
                    {isRegistering ? 'Create Account' : 'Welcome Back'}
                  </h2>
                  <p className="text-slate-500 text-sm">
                    {isRegistering ? 'Sign up to save your ATS diagnostics' : 'Sign in to save your ATS diagnostics'}
                  </p>
                </div>

                {authError && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {authError}
                  </div>
                )}

                <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                    <input 
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Password</label>
                    <input 
                      type="password"
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength={6}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={authLoading}
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 hover:glow-indigo transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {authLoading ? 'Please wait...' : (isRegistering ? 'Create Account' : 'Sign In')}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      setIsRegistering(!isRegistering);
                      setAuthError('');
                    }}
                    className="text-sm text-slate-500 hover:text-indigo-400 transition-colors"
                  >
                    {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800 text-center">
                  <p className="text-xs text-slate-600">
                    By signing in, you agree to our <a href="#" className="text-indigo-400 hover:underline">Terms</a> and <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Ask Anything Chat */}
      <div className="fixed bottom-8 right-8 z-[100] no-print">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-20 right-0 w-[400px] h-[500px] glass-card rounded-3xl shadow-2xl flex flex-col overflow-hidden border-indigo-500/30 glow-indigo"
            >
              <div className="bg-slate-950/80 p-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-display font-bold text-white">Ask Anything AI</span>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {chatMessages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800">
                      <MessageSquare className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Need help with your resume?</p>
                      <p className="text-slate-500 text-xs mt-1">Ask me about specific skills, formatting, or how to improve your match score.</p>
                    </div>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div 
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-slate-900 text-slate-300 border border-slate-800 rounded-tl-none'
                    }`}>
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900 text-slate-300 border border-slate-800 p-3 rounded-2xl rounded-tl-none">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-950/80 border-t border-slate-800">
                <div className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="Ask a question..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 outline-none"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isChatLoading || !chatInput.trim()}
                    className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                {!result && (
                  <p className="text-[8px] text-slate-600 text-center mt-2 uppercase tracking-widest">
                    AI is in general mode. Run analysis for specific advice.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 ${
            isChatOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-indigo-600 text-white hover:glow-indigo'
          }`}
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 mt-12 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <Target className="w-4 h-4 text-slate-950" />
              </div>
              <span className="font-display font-bold text-white">ATSPro</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              The professional standard for resume optimization. Built for engineers, by engineers, to navigate the complexities of modern recruitment algorithms.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-6 text-sm uppercase tracking-widest">Product</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Enterprise</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-slate-600">© 2026 ATSPro AI. All rights reserved.</p>
          <div className="flex gap-6">
            <div className="w-5 h-5 bg-slate-800 rounded-full" />
            <div className="w-5 h-5 bg-slate-800 rounded-full" />
            <div className="w-5 h-5 bg-slate-800 rounded-full" />
          </div>
        </div>
      </footer>
    </div>
  );
}
