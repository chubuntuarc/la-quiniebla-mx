import nodemailer from 'nodemailer';

export function generateVerificationCode() {
  // Generate a 6-digit code
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendVerificationEmail(email, code) {
  // Configure your email transport
  const transporter = nodemailer.createTransport({
    // Add your email service configuration here
    // Example for Gmail:
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: "La quiniela pro <laquinielapro@gmail.com>",
    to: email,
    subject: 'Tu codigo de inicio de sesion',
    text: `Tu codigo de inicio de sesion es: ${code}`,
    html: `<p>Tu codigo de inicio de sesion es: <strong>${code}</strong></p>`,
  });
}
