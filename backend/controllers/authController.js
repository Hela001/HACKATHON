const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    
    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration error stack:', error.stack);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Log in an existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const sendEmail = require('../utils/sendEmail');

// Request password reset (real email integration)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email' });
    }
    
    const resetUrl = `http://localhost:5173/reset-password?email=${email}`;
    
    // HTML email template inspired by the logo
    const html = `
      <div style="font-family: 'Inter', sans-serif; background-color: #F9FAFB; padding: 40px; border-radius: 12px; border: 1px solid #E5E7EB;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="color: #064E3B; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">CARBO°RESET</div>
        </div>
        <h2 style="color: #111827; font-size: 20px; font-weight: 700; margin-bottom: 20px;">Password Reset Request</h2>
        <p style="color: #6B7280; font-size: 16px; line-height: 1.6;">
          Hello <b>${user.name}</b>,
        </p>
        <p style="color: #6B7280; font-size: 16px; line-height: 1.6;">
          We received a request to reset your password for your Carbo°RESET account. Click the button below to secure your account:
        </p>
        <div style="text-align: center; margin: 35px 0;">
          <a href="${resetUrl}" style="background-color: #059669; color: #FFFFFF; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
            Reset Your Password
          </a>
        </div>
        <p style="color: #6B7280; font-size: 14px; line-height: 1.6;">
          If you did not request this, please ignore this email. This link will expire shortly.
        </p>
        <hr style="border: 0; border-top: 1px solid #E5E7EB; margin: 30px 0;">
        <p style="color: #9CA3AF; font-size: 12px; text-align: center;">
          Carbo°RESET 2026 Summit · ESPRIT · Tunisia
        </p>
      </div>
    `;

    // Send the actual email
    try {
        await sendEmail({
            email: user.email,
            subject: 'Carbo°RESET - Password Reset Request',
            html: html
        });
        
        res.status(200).json({
          success: true,
          message: 'A real password reset link was sent to your email. Please check your inbox.',
        });
    } catch (emailError) {
        console.error('Nodemailer error:', emailError);
        res.status(500).json({ 
            success: false, 
            message: 'Internal Error: Could not send email. Check if your credentials in .env are correct.' 
        });
    }

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reset Password (mock version endpoint)
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    user.password = newPassword; // Mongoose middleware will hash this automatically
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Password updated successfully! You can now login.',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
