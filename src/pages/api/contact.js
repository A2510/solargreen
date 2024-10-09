import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other email providers
      auth: {
        user: 'your-email@gmail.com',  // Replace with your email
        pass: 'your-email-password',   // Replace with your email password
      },
    });

    // Mail options
    const mailOptions = {
      from: email, // Sender's email
      to: 'your-email@gmail.com', // Your email to receive submissions
      subject: `New Contact Form Submission from ${name}`,
      text: `You received a message from ${name} (${email}): \n\n${message}`,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
