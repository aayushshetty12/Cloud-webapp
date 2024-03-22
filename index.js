import express from'express';
import registerRoutes from "./routes/index.js";

const app = express();
app.use(express.json());

registerRoutes(app);


const port = 8000;
app.listen(port, () => console.log(`App running on port ${port}`));

export default app