import express, { Response } from 'express';
import { protect, AuthRequest } from '../middleware/auth';
import Analysis from '../models/Analysis';
import User from '../models/User';
import { sendAnalysisEmail } from '../services/email';

const router = express.Router();

// @route   POST /api/email/send-analysis
// @desc    Send analysis report via email
// @access  Private
router.post('/send-analysis', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { analysisId, recipientEmail } = req.body;

    // Validation
    if (!analysisId) {
      return res.status(400).json({ error: 'Please provide analysis ID' });
    }

    // Get analysis
    const analysis = await Analysis.findOne({
      _id: analysisId,
      userId: req.userId
    });

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    // Get user info
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Use provided email or user's email
    const emailTo = recipientEmail || user.email;
    const userName = user.name || user.email.split('@')[0];

    // Send email
    await sendAnalysisEmail(
      emailTo,
      userName,
      analysis.score,
      analysis.result
    );

    res.json({
      success: true,
      message: `Analysis report sent to ${emailTo}`
    });
  } catch (error: any) {
    console.error('Send email error:', error);
    res.status(500).json({ error: error.message || 'Failed to send email' });
  }
});

// @route   POST /api/email/test
// @desc    Test email configuration
// @access  Private
router.post('/test', protect, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await sendAnalysisEmail(
      user.email,
      user.name || user.email.split('@')[0],
      85,
      '# Test Analysis\n\nThis is a test email to verify your email configuration is working correctly.'
    );

    res.json({
      success: true,
      message: `Test email sent to ${user.email}`
    });
  } catch (error: any) {
    console.error('Test email error:', error);
    res.status(500).json({ error: error.message || 'Email configuration error. Please check your .env settings.' });
  }
});

export default router;
