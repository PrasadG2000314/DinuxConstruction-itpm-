import express from 'express';
import feedbackController from '../controller/feedbackController.js';

const feedbackRouter = express.Router();

feedbackRouter.get('/get', feedbackController.getFeedback);
feedbackRouter.get('/get/:id', feedbackController.getFeedbackById);
feedbackRouter.post('/create', feedbackController.addFeedback);
feedbackRouter.put('/update', feedbackController.updateFeedback);
feedbackRouter.delete('/delete/:id', feedbackController.deleteFeedback);
feedbackRouter.get('/count', feedbackController.getTotalFeedbackCount);


export default feedbackRouter;