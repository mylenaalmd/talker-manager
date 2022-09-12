const rateValidation = (req, res, next) => {
  const { rate } = req.body.talk;
  if (Number(rate) > 5 || Number(rate) < 1) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (!rate) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }

  return next();
};

module.exports = rateValidation;