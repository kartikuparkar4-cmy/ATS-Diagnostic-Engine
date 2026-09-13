import React from 'react';
import { motion } from 'motion/react';

interface ScoreVisualizationProps {
  score: number;
  keywordScore?: number;
  skillsScore?: number;
  experienceScore?: number;
  formatScore?: number;
}

export const CircularProgress: React.FC<{ score: number; size?: number }> = ({ score, size = 120 }) => {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 85) return '#10b981'; // emerald-500
    if (score >= 75) return '#3b82f6'; // blue-500
    if (score >= 65) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          className="text-slate-800"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-3xl font-display font-bold text-white">{score}%</div>
          <div className="text-xs text-slate-500 uppercase tracking-wider">Score</div>
        </motion.div>
      </div>
    </div>
  );
};

export const CategoryBar: React.FC<{ label: string; score: number; weight: number }> = ({ label, score, weight }) => {
  const getColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 65) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-300">{label}</span>
          <span className="text-xs text-slate-600">({weight}%)</span>
        </div>
        <span className="font-bold text-white">{score}%</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getColor(score)} rounded-full`}
          initial={{ width: "0%" }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export const ScoreVisualization: React.FC<ScoreVisualizationProps> = ({
  score,
  keywordScore = 0,
  skillsScore = 0,
  experienceScore = 0,
  formatScore = 0,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* Circular Progress */}
      <div className="glass-card p-8 rounded-3xl flex flex-col items-center justify-center">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Overall Match</h3>
        <CircularProgress score={score} size={180} />
        <p className="mt-6 text-xs text-slate-500 text-center max-w-[200px]">
          {score >= 85 ? 'Excellent match! Strong candidate.' :
           score >= 75 ? 'Good match with minor improvements needed.' :
           score >= 65 ? 'Fair match. Optimization recommended.' :
           'Significant improvements required.'}
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="glass-card p-8 rounded-3xl">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Score Breakdown</h3>
        <div className="space-y-6">
          <CategoryBar label="Keywords" score={keywordScore} weight={40} />
          <CategoryBar label="Skills" score={skillsScore} weight={30} />
          <CategoryBar label="Experience" score={experienceScore} weight={20} />
          <CategoryBar label="Format" score={formatScore} weight={10} />
        </div>
      </div>
    </div>
  );
};
