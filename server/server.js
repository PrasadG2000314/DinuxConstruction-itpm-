import app from "./app.js";
import logger from "./utils/logger.js";
import connectDatabase from "./utils/database.js";

const PORT = 3000;

app.listen(PORT, () => {
    logger.info(`Server has started and running on PORT ${PORT}`);
    connectDatabase();
  });