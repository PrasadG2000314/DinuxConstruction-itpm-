// routes/StockRouter.js
import express from 'express';
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('Stock route');
});

// Export the router
export { router as stockRouter };