/**
 * Verifies if the provided code matches the stored verification code for the email
 * @param {string} email - The user's email address
 * @param {string} code - The verification code to check
 * @returns {Promise<boolean>} - Returns true if code is valid, false otherwise
 */
export async function verifyCode(email, code) {
  try {
    // Get the stored verification data from the database
    const verificationData = await db.verificationCodes.findUnique({
      where: { email }
    });

    // If no verification code exists for this email
    if (!verificationData) {
      return false;
    }

    // Check if code has expired (typically 10 minutes)
    const EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds
    const isExpired = Date.now() - verificationData.createdAt > EXPIRATION_TIME;
    
    if (isExpired) {
      // Delete expired code
      await db.verificationCodes.delete({
        where: { email }
      });
      return false;
    }

    // Compare the stored code with the provided code
    const isValid = verificationData.code === code;

    if (isValid) {
      // Delete the verification code after successful verification
      await db.verificationCodes.delete({
        where: { email }
      });
    }

    return isValid;
  } catch (error) {
    console.error('Error verifying code:', error);
    return false;
  }
} 