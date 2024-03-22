import healthzRoutes from '../routes/healthz-route.js';
import userRoutes from '../routes/user-route.js';

export default (app) => {
    app.use('/healthz', healthzRoutes)
    app.use('/v1/user', userRoutes)
    app.all('*', (req, res) => {
      logger.error({
        message: "Invalid API endpoint", 
        httpRequest: {
          requestMethod: req.method,
          requestUrl: req.originalUrl,
          status: 400, 
        }
      })
        res.status(400).send();
      });
}
