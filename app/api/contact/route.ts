import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, reason, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'namnam9252@gmail.com',
        pass: process.env.pass, // Using the variable name from your .env file
      },
    });

    // 1. Email to Admin (You)
    const mailOptionsToAdmin = {
      from: 'namnam9252@gmail.com',
      to: 'gnaman180@gmail.com',
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // 2. Email to User (Confirmation)
    const mailOptionsToUser = {
      from: 'namnam9252@gmail.com',
      to: email,
      subject: 'Thank you for contacting Naman!',
      html: `
        <h2>Hi ${firstName},</h2>
        <p>Thanks for reaching out! I've received your message and will get back to you as soon as possible.</p>
        <br/>
        <p>Best regards,</p>
        <p>Naman</p>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailOptionsToAdmin),
      transporter.sendMail(mailOptionsToUser),
    ]);

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
        message: error.message,
        code: error.code,
        command: error.command,
        response: error.response
    });
    // Log credential status (don't log the actual password)
    console.log('Credentials check:', {
        user: 'namnam9252@gmail.com',
        passExists: !!process.env.pass,
        passLength: process.env.pass ? process.env.pass.length : 0
    });
    return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
  }
}
