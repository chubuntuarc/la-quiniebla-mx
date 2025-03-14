import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
        error: 'Email and code are required' 
      });
    }

    // Verify the code using Prisma
    const verificationRecord = await prisma.verificationCode.findFirst({
      where: {
        email,
        code,
        expiresAt: {
          gt: new Date() // Check if code hasn't expired
        }
      }
    });

    if (!verificationRecord) {
      return res.status(400).json({ 
        error: 'Invalid or expired verification code' 
      });
    }

    // Delete the used verification code
    await prisma.verificationCode.delete({
      where: {
        id: verificationRecord.id
      }
    });

    // If code is valid, return success
    return res.status(200).json({ 
      success: true 
    });

  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
} 