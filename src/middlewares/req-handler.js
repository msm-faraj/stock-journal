const reqHandler = (anyFunction) => {
  return async (req, res, next) => {
    try {
      await anyFunction(req, res, next);
    } catch (error) {
      return { Error: error };
    }
  };
};

module.exports = reqHandler;
