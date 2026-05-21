const nodemailer = require('nodemailer');

const sendQueryNotificationEmail = async (queryDetails) => {
  try {
    const { farmerName, farmerEmail, district, query, category } = queryDetails;

    // Check if email config is provided
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.ADMIN_EMAIL) {
      console.warn('Email configuration is missing. Query notification email was not sent.');
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services if needed
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      replyTo: farmerEmail,
      subject: `New Farmer Query: ${category || 'General'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #2e7d32; text-align: center;">New Agricultural Query</h2>
          <p style="font-size: 16px;">A new query has been submitted via the Smart Yield Advisory App.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Farmer Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${farmerName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Farmer Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${farmerEmail}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>District:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${district}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Category:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${category || 'Other'}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #2e7d32; border-radius: 4px;">
            <h3 style="margin-top: 0; color: #333;">Query Details:</h3>
            <p style="line-height: 1.6; color: #555;">${query}</p>
          </div>
          
          <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
            This is an automated message from the Smart Yield App.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Query notification email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending query notification email:', error);
  }
};

module.exports = {
  sendQueryNotificationEmail,
};
