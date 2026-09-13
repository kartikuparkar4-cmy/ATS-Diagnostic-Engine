import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalysis extends Document {
  userId: mongoose.Types.ObjectId;
  jobDescription: string;
  resume: string;
  result: string;
  score: number;
  keywordScore?: number;
  skillsScore?: number;
  experienceScore?: number;
  formatScore?: number;
  title: string;
  createdAt: Date;
}

const AnalysisSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  keywordScore: {
    type: Number,
    min: 0,
    max: 100
  },
  skillsScore: {
    type: Number,
    min: 0,
    max: 100
  },
  experienceScore: {
    type: Number,
    min: 0,
    max: 100
  },
  formatScore: {
    type: Number,
    min: 0,
    max: 100
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
AnalysisSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<IAnalysis>('Analysis', AnalysisSchema);
