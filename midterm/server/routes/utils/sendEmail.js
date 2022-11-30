const nodemailer = require('nodemailer');
const generateTokens = require('./generateToken');
const { UpdateEmailToken, MyProfile } = require('../user/userController');
var crypto = require('crypto');

const hostname = 'http://localhost:3001';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'advancedweb2022.project@gmail.com',
    pass: 'jisykexvjiyjgsna',
  },
});

const sendVerifyEmail = async (userId, email) => {
  const { status } = await (await MyProfile(userId)).myProfile;

  if (status !== 'Pending') {
    return;
  }
  const emailToken = await (await generateTokens({ email })).accessToken;
  const hash = crypto.createHash('sha256').update(emailToken).digest('hex');

  const mailOptions = {
    from: 'advancedweb2022.project@gmail.com',
    to: email,
    subject: 'Verify your account',
    html: `Please click this <a href="${hostname}/activation/${hash}">link</a> to activate your account`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      UpdateEmailToken(userId, hash);
    }
  });
};

const sendInviteEmail = async (email, groupId) => {
  const mailOptions = {
    from: 'advancedweb2022.project@gmail.com',
    to: email,
    subject: 'Join a group',
    html: `Please click this <a href="${hostname}/join/${groupId}">link</a> to join a group`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = {
  sendVerifyEmail,
  sendInviteEmail,
};
