import express from 'express';
import complaintController from '../controller/ComplaintController.js';

const complaintRouter = express.Router();

complaintRouter.get('/get', complaintController.getComplaint);
complaintRouter.post('/create', complaintController.addComplaint);
complaintRouter.put('/update', complaintController.updateComplaint);
complaintRouter.delete('/delete/:id', complaintController.deleteComplaint);
complaintRouter.get('/count', complaintController.getTotalComplaintCount);

export default complaintRouter;