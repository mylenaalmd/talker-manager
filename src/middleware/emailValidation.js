const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/; // stackoverflow;
// const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (regex.test(email)) {
    return next();
  }
  return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
};

module.exports = emailValidation;