const reqHandler = (anyFunction) => {
  return async (req, res, next) => {
    try {
      await anyFunction(req, res, next);
    } catch (error) {
      console.error({ Error: error });
    }
  };
};

module.exports = reqHandler;
