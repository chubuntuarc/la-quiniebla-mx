import { verifyCode } from '../../../src/lib/api/auth';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, code } = req.body;

    // Validate required fields
    if (!email || !code) {
      return res.status(400).json({ 
        error: 'Email y codigo son requeridos' 
      });
    }

    // Verify the code  
    const isValid = await verifyCode(email, code);

    if (!isValid) {
      return res.status(400).json({ 
        error: 'Codigo de verificacion invalido' 
      });
    }

    // If code is valid, return success
    return res.status(200).json({ 
      success: true 
    });

  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
} 