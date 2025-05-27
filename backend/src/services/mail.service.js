import nodemailer from "nodemailer";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationEmail(toEmail, activationLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: toEmail,
      subject: `Activation email from ${process.env.APP_NAME}`,
      text: ``,
      html: `
              <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                  <h2 style="color: #333;">Dear customer,</h2>
                  <p style="font-size: 16px; color: #555;">
                    Please click the button below to confirm your account:
                  </p>
              
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="${activationLink}" target="_blank" style="
                      background-color: #4CAF50;
                      color: white;
                      padding: 14px 24px;
                      text-decoration: none;
                      font-size: 16px;
                      border-radius: 5px;
                      display: inline-block;
                    ">Confirm Account</a>
                  </div>
              
                  <p style="font-size: 14px; color: #999; margin-top: 40px;">
                    If you didn’t request this email, you can safely ignore it.
                  </p>
                </div>
              </div>
            `,
    });
  }

  async sendFeedback(firstName, lastName, fromEmail, message) {
    const siteEmail = process.env.SMTP_USER;

    await this.transporter.sendMail({
      from: `"${firstName} ${lastName}" <${fromEmail}>`,
      to: siteEmail,
      subject: `New Feedback from ${firstName} ${lastName}`,
      text: message,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New Feedback Received</h2>
        <p><strong>From:</strong> ${firstName} ${lastName} (${fromEmail})</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f4f4f4; padding: 10px; border-radius: 5px;">
          ${message}
        </p>
      </div>
    `,
    });
  }
}

export default new MailService();
