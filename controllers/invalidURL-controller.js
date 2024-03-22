import logger from "../logger.js";

export const errorURL = async (req, res) => {
    logger.error({
      message: "Invalid API endpoint", 
      httpRequest: {
        requestMethod: req.method,
        requestUrl: req.originalUrl,
        status: 404, 
      }
  })
    res.status(404).send();
  }
