const generateEmailTemplate = (subject, greeting, messageBody, footerText) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background-color: #4caf50;
              padding: 20px;
              text-align: center;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 30px;
            }
            .content p {
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              font-size: 16px;
              color: white;
              background-color: #4caf50;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              background-color: #f4f4f4;
              padding: 10px;
              text-align: center;
              font-size: 14px;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header Section -->
            <div class="header">
              <h1>${subject}</h1>
            </div>
  
            <!-- Content Section -->
            <div class="content">
              <p>${greeting}</p>
              <p>${messageBody}</p>
  
              <!-- Add a button if needed -->
             <!-- <a href="#" class="button">Take Action</a> -->
            </div>
  
            <!-- Footer Section -->
            <div class="footer">
              <p>${footerText}</p>
            </div>
          </div>
        </body>
      </html>
      `
  }
  
  const registrationEmail = (fullName, activationLink) => {
    const subject = "Registration Successful - Welcome!"
    const greeting = `Hello ${fullName},`
    const messageBody = `
          <p>Thank you for registering with us! We are excited to have you on board.</p>
          <p>Please verify your email address by clicking the button below:</p>
          <a href="${activationLink}" style="
              display: inline-block;
              padding: 10px 20px;
              font-size: 16px;
              color: #fff;
              background-color: #007bff;
              text-decoration: none;
              border-radius: 5px;
          ">Verify Email</a>
          <p>If the button above doesn't work, copy and paste the following URL into your browser:</p>
          <p><a href="${activationLink}">${activationLink}</a></p>
          <p>This link will expire in 30 minutes.</p>
        `
    const footerText = "If you did not request this, please contact our support team."
  
    return generateEmailTemplate(subject, greeting, messageBody, footerText)
  }
  
  const subscriptionConfirmationEmail = (firstName, lastName, subscriptionPlanTitle, startDate, endDate, transactionId) => {
    const subject = "Subscription Activated - Welcome!"
    const greeting = `Hello ${firstName} ${lastName},`
    const messageBody = `
          <p>Thank you for subscribing to our service! We are thrilled to have you onboard.</p>
          <p><strong>Subscription Details:</strong></p>
          <div style="
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 8px;
            background-color: #f9f9f9;
          ">
            <p><strong>Plan:</strong> ${subscriptionPlanTitle}</p>
            <p><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> ${new Date(endDate).toLocaleDateString()}</p>
            <p><strong>Transaction ID:</strong> ${transactionId}</p>
          </div>
          <p>If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
        `
    const footerText = "If you did not request this, please contact our support team immediately."
  
    return generateEmailTemplate(subject, greeting, messageBody, footerText)
  }
  
  const accountVerificationEmail = (fullName, email) => {
    const subject = "Account Verified"
    const greeting = `Hello ${fullName},`
    const messageBody = `
        <p>Thank you for signing up!</p>
        <p>Your email has been verified successfully.</p>
        <p>Now you can login to your account using you email: <strong>${email}</strong></p>
      `
    const footerText = "If you need help, feel free to contact our support team."
  
    return generateEmailTemplate(subject, greeting, messageBody, footerText)
  }
  
  const generateNewAccountActivationEmail = (fullName, activationLink) => {
    const subject = "New Verification Link - Verify Your Account"
    const greeting = `Hello ${fullName},`
    const messageBody = `
        <p>We received a request for a new verification link.</p>
        <p>Click the button below to verify your account:</p>
        <a href="${activationLink}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-weight: bold;">Verify Email</a>
        <p>If the button above doesn't work, copy and paste the following URL into your browser:</p>
        <p><a href="${activationLink}">${activationLink}</a></p>
      `
    const footerText = "This link is valid for 30 minutes. If you did not request this, please contact our support team."
  
    return generateEmailTemplate(subject, greeting, messageBody, footerText)
  }
  
  const generateAdminReplyEmail = (firstName, lastName, videoPageUrl, lessonTitle, type) => {
    const subjectType = type === "question" ? "Question" : "Feedback"
    const subject = `Admin Response to Your ${subjectType} on ${lessonTitle}`
    const greeting = `Dear ${firstName} ${lastName},`
    const messageBody = `
        <p>Thank you for sharing your ${subjectType.toLowerCase()} on ${lessonTitle}. Our team values your input, and the admin has responded to your ${subjectType.toLowerCase()}.</p>
        <p>You can view the reply by visiting the following link:</p>
        <a href="${videoPageUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-weight: bold;">View Response</a>
        <p>If the button above doesn't work, copy and paste the following URL into your browser:</p>
        <p><a href="${videoPageUrl}">${videoPageUrl}</a></p>
        <p>We appreciate your engagement and hope this enhances your learning experience. If you have any further questions or concerns, feel free to reach out.</p>
      `
    const footerText = `
        <p>Best Regards,</p>
        <p>TheOne Academy Team</p>
    `
  
    return generateEmailTemplate(subject, greeting, messageBody, footerText)
  }
  
  const generatePasswordResetEmail = (fullName, resetLink) => {
    const subject = "Password Reset Request"
    const greeting = `Hello ${fullName},`
    const messageBody = `
        <p>You requested to reset your password. Click the button below to reset it:</p>
        <a href="${resetLink}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-weight: bold;">Reset Password</a>
        <p>If the button above doesn't work, copy and paste the following URL into your browser:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
      `
    const footerText = "This link is valid for 30 minutes. If you didn't request this, please ignore this email or contact support."
  
    return generateEmailTemplate(subject, greeting, messageBody, footerText)
  }
  
  const passwordResetConfirmationEmail = (fullName, email) => {
    const subject = "Password Reset Confirmation"
    const greeting = `Hello ${fullName},`
    const messageBody = `
        <p>Your password has been reset successfully for your account associated with ${email}.</p>
        <p>If you didn't reset your password, please contact support immediately.</p>
      `
    const footerText = "If you need assistance, please contact our support team."
  
    return generateEmailTemplate(subject, greeting, messageBody, footerText)
  }
  
  const loginNotificationEmail = (first_name, last_name) => {
    const subject = "New Login to Your Account"
    const greeting = `Hello ${first_name} ${last_name},`
    const messageBody = `
        <p>We noticed a new login to your account just now.</p>
        <p>If this was you, you can safely ignore this email. If you didn't log in, please change your password immediately to protect your account.</p>
      `
    const footerText = "If you need assistance, please contact our support team."
  
    return generateEmailTemplate(subject, greeting, messageBody, footerText)
  }
  
  const passwordUpdateEmail = (fullName, email) => {
    const subject = "Your Password Has Been Updated"
    const greeting = `Hello ${fullName},`
    const messageBody = `
      <p>Your account password has just been updated against email.</p>
      <p><strong>${email}</strong></p>
      <p>If you made this change, no further action is required. If you did not change your password, please contact our support team immediately.</p>
    `
    const footerText = "If you need assistance, please contact our support team."
  
    return generateEmailTemplate(subject, greeting, messageBody, footerText)
}
  
const businessInviteExistingUser = (businessName, inviteUrl) => {
  const subject = `You're invited to join ${businessName}`;
  const greeting = `Hello,`;
  const messageBody = `
    <p>You’ve been invited to join the business <strong>${businessName}</strong>.</p>
    <p>Please click the button below to accept the invitation:</p>
    <a href="${inviteUrl}" style="
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      color: #fff;
      background-color: #4caf50;
      text-decoration: none;
      border-radius: 5px;
    ">Join Business</a>
    <p>If the button above doesn't work, copy and paste this link into your browser:</p>
    <p><a href="${inviteUrl}">${inviteUrl}</a></p>
    <p>This invitation link is valid for 24 hours.</p>
  `;
  const footerText = `If you did not expect this invitation, please ignore this email.`;

  return generateEmailTemplate(subject, greeting, messageBody, footerText);
};

const businessInviteNewUser = (businessName, signupLink) => {
  const subject = `Join ${businessName} on Our Platform`;
  const greeting = `Hello,`;
  const messageBody = `
    <p>You’ve been invited to join the business <strong>${businessName}</strong>.</p>
    <p>To get started, please sign up using the link below:</p>
    <a href="${signupLink}" style="
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      color: #fff;
      background-color: #4caf50;
      text-decoration: none;
      border-radius: 5px;
    ">Create Your Account</a>
    <p>If the button above doesn't work, copy and paste this link into your browser:</p>
    <p><a href="${signupLink}">${signupLink}</a></p>
  `;
  const footerText = `If you did not request this, you can ignore this email.`;

  return generateEmailTemplate(subject, greeting, messageBody, footerText);
};
  
  const adminCreateUser = (firstName, lastName, email, password) => {
    const subject = "Account Created Successfully by Admin - Welcome!"
    const greeting = `Hello ${firstName} ${lastName},`
    const messageBody = `
      <p>Ypur account has been created by admin.</p>
      <p>These are your credentials of your account</p>
      <p>Username/Email: <strong>${email}</strong></p>
      <p>Password: <strong>${password}</strong></p>
      <p>This is your auto generated password please update your password after logging in to your account.</p>
    `
    const footerText = "If you did not request this, please contact our support team."
  
    return generateEmailTemplate(subject, greeting, messageBody, footerText)
  }
  
  const onHelpEmail = (firstName, lastName, email, message) => {
    const contactSubject = "New Help Support Inquiry Form Submission"
    const greeting = `Hy, TheOneAcademy Support Team.`
    const messageBody = `
      <p>You have received a new message from a ${firstName} ${lastName} via the help Inquiry form:</p>
      <p><strong>Full Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
    const footerText = "This is a system-generated email, please do not reply."
  
    return generateEmailTemplate(contactSubject, greeting, messageBody, footerText)
  }
  
export {
  registrationEmail,
  subscriptionConfirmationEmail,
  loginNotificationEmail,
  accountVerificationEmail,
  generateNewAccountActivationEmail,
  passwordUpdateEmail,
  generatePasswordResetEmail,
  passwordResetConfirmationEmail,
  businessInviteExistingUser,
  businessInviteNewUser,
  adminCreateUser,
  onHelpEmail,
  generateAdminReplyEmail,
};
  