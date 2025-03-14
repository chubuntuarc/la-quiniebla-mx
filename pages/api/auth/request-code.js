import { generateVerificationCode, sendVerificationEmail } from '../../../utils/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate a verification code (you'll need to implement this)
    const verificationCode = generateVerificationCode();

    // Store the code in your database associated with the email
    // This is where you'd implement your database logic

    // Send the verification code via email
    await sendVerificationEmail(email, verificationCode);

    return res.status(200).json({ message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    return res.status(500).json({ error: 'Failed to send verification code' });
  }
} 
