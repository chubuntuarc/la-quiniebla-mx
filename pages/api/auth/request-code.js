import { generateVerificationCode, sendVerificationEmail } from '../../../utils/auth';
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if user exists, if not create them
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email }
      });
    }

    // Generate a verification code
    const verificationCode = generateVerificationCode();
    
    // Set expiration time (30 minutes from now)
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    // Store the code in the database
    await prisma.verificationCode.create({
      data: {
        code: verificationCode,
        expiresAt,
        user: {
          connect: {
            id: user.id
          }
        }
      },
    });

    // Send the verification code via email
    await sendVerificationEmail(email, verificationCode);

    return res.status(200).json({ message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    return res.status(500).json({ error: 'Failed to send verification code' });
  } finally {
    await prisma.$disconnect();  // Ensure Prisma client is properly disconnected
  }
} 
