import app from "./app.js";
import logger from "./utils/logger.js";
import connectDatabase from "./utils/database.js";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    logger.info(`Server has started and running on PORT ${PORT}`);
    connectDatabase();
  });