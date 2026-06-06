const nodemailer = require("nodemailer");

let google;
try {
  google = require('googleapis').google;
} catch (e) {
  // googleapis is optional; OAuth2 path will error if not installed.
}

const sendMail = async (options) => {
  let transporterConfig;

  const authMethod = (process.env.SMTP_AUTH_METHOD || 'login').toLowerCase();

  if (authMethod === 'oauth2') {
    if (!google) throw new Error('googleapis is required for OAuth2. Run: npm install googleapis');

    const { OAuth2 } = google.auth;
    const oauth2Client = new OAuth2(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse && accessTokenResponse.token ? accessTokenResponse.token : accessTokenResponse;

    transporterConfig = {
      service: process.env.SMTP_SERVICE || 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.SMTP_MAIL,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken,
      },
    };
  } else {
    transporterConfig = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === "true" || Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    if (process.env.SMTP_SERVICE) {
      transporterConfig.service = process.env.SMTP_SERVICE;
    }
  }

  const transporter = nodemailer.createTransport(transporterConfig);

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
