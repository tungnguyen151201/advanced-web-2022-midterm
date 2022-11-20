const express = require('express');
const router = express.Router();
const passport = require('passport');
// GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
// GET /auth/google/callback'
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/home' }),
  (req, res) => {
    // Successful authentication, redirect home.
    const token = jwt.sign(
      { username: req.session.username },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    res.status(200).send({ status: true, message: 'login success!', token });
  }
);
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      throw err;
    }
    res.status(200).send({ status: true, message: 'logout success!' });
  });
});
module.exports = router;
