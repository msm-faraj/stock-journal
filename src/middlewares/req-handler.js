const reqHandler = (anyFunction) => {
  return async (req, res, next) => {
    try {
      await anyFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = reqHandler;
