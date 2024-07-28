const reqHandler = (anyFunction) => {
  return async (req, res, next) => {
    try {
      await anyFunction(req, res, next);
    } catch (error) {
      console.error({ "Error: ": error.message });
    }
  };
};

module.exports = reqHandler;
