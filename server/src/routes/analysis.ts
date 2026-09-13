import express, { Response } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import Analysis from '../models/Analysis';
import { analyzeResumeWithAI } from '../services/gemini';

const router = express.Router();

// @route   POST /api/analysis/analyze
// @desc    Analyze resume against job description
// @access  Private
router.post('/analyze', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { jobDescription, resume } = req.body;

    // Validation
    if (!jobDescription || !resume) {
      return res.status(400).json({ error: 'Please provide both job description and resume' });
    }

    // Call Gemini AI (API key is hidden in backend)
    const analysisResult = await analyzeResumeWithAI(jobDescription, resume);

    // Extract scores from result
    const overallScoreMatch = analysisResult.match(/Overall Match Score:\s*(\d+)%/);
    const keywordMatch = analysisResult.match(/Required Keywords.*?(\d+)%/);
    const skillsMatch = analysisResult.match(/Skills Alignment.*?(\d+)%/);
    const experienceMatch = analysisResult.match(/Experience Level.*?(\d+)%/);
    const formatMatch = analysisResult.match(/Formatting Quality.*?(\d+)%/);

    const score = overallScoreMatch ? parseInt(overallScoreMatch[1]) : 0;
    const keywordScore = keywordMatch ? parseInt(keywordMatch[1]) : undefined;
    const skillsScore = skillsMatch ? parseInt(skillsMatch[1]) : undefined;
    const experienceScore = experienceMatch ? parseInt(experienceMatch[1]) : undefined;
    const formatScore = formatMatch ? parseInt(formatMatch[1]) : undefined;

    // Generate title from first line of job description
    const title = jobDescription.split('\n')[0].substring(0, 50) + '...';

    // Save to database
    const analysis = await Analysis.create({
      userId: req.userId,
      jobDescription,
      resume,
      result: analysisResult,
      score,
      keywordScore,
      skillsScore,
      experienceScore,
      formatScore,
      title
    });

    res.json({
      success: true,
      analysis: {
        id: analysis._id,
        result: analysisResult,
        score,
        keywordScore,
        skillsScore,
        experienceScore,
        formatScore,
        title,
        createdAt: analysis.createdAt
      }
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze resume' });
  }
});

// @route   GET /api/analysis/history
// @desc    Get user's analysis history
// @access  Private
router.get('/history', protect, async (req: AuthRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const analyses = await Analysis.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select('-resume -jobDescription'); // Don't send full text for list view

    const total = await Analysis.countDocuments({ userId: req.userId });

    res.json({
      success: true,
      analyses: analyses.map(a => ({
        id: a._id,
        title: a.title,
        score: a.score,
        createdAt: a.createdAt
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Get history error:', error);
    res.status(500).json({ error: error.message || 'Failed to get history' });
  }
});

// @route   GET /api/analysis/:id
// @desc    Get single analysis by ID
// @access  Private
router.get('/:id', protect, async (req: AuthRequest, res: Response) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json({
      success: true,
      analysis: {
        id: analysis._id,
        jobDescription: analysis.jobDescription,
        resume: analysis.resume,
        result: analysis.result,
        score: analysis.score,
        keywordScore: analysis.keywordScore,
        skillsScore: analysis.skillsScore,
        experienceScore: analysis.experienceScore,
        formatScore: analysis.formatScore,
        title: analysis.title,
        createdAt: analysis.createdAt
      }
    });
  } catch (error: any) {
    console.error('Get analysis error:', error);
    res.status(500).json({ error: error.message || 'Failed to get analysis' });
  }
});

// @route   DELETE /api/analysis/:id
// @desc    Delete analysis
// @access  Private
router.delete('/:id', protect, async (req: AuthRequest, res: Response) => {
  try {
    const analysis = await Analysis.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json({
      success: true,
      message: 'Analysis deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete analysis error:', error);
    res.status(500).json({ error: error.message || 'Failed to delete analysis' });
  }
});

export default router;
