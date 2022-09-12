const express = require('express');
const crypto = require('crypto'); // stackoverflow;
const emailValidation = require('../middleware/emailValidation');
const passwordValidation = require('../middleware/passwordValidation');

const router = express.Router();

router.post('/', emailValidation, passwordValidation, (_req, res) => {
  // const { email, password } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  console.log(token);
  return res.status(200).json({ token,
  });
});

module.exports = router;