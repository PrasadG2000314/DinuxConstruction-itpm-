import Feedback from "../models/feedbackModel.js";
import logger from "../utils/logger.js";

const getFeedbackById = (req, res) => {
    const id = req.params.id;
    Feedback.findOne({ id: id })
        .then(response => {
            logger.info("Succesfully fetched Feedback by id");
            res.status(200).json({ response });
        })
        .catch(error => {
            logger.error("Error Fetching Feedback Id");
            res.status(400).json({ message: error.message });
        });
};

const getFeedback = (req, res) => {
    Feedback.find()
        .then(response => {
            logger.info("Succesfully fetched all Feedback");
            res.status(200).json({ response });
        })
        .catch(error => {
            logger.error("Error Fetching Feedbacks");
            res.status(400).json({ message: error.message });
        });
};

const addFeedback = (req, res) => {
    const feedback = new Feedback({
        id: req.body.id,
        feedback: req.body.feedback,
    });
    feedback.save()
        .then(response => {
            logger.info("Succesfully Added Feedback");
            res.status(200).json({ response });
        })
        .catch(error => {
            logger.error("Error Adding Feedbacks");
            res.status(400).json({ message: error.message });
        });
};

const updateFeedback = (req, res) => {
    const { id, feedback } = req.body;
    Feedback.updateOne({ id: id }, { $set: { feedback: feedback } })
        .then(response => {
            logger.info("Succesfully Updated Feedback");
            res.status(200).json({ response });
        })
        .catch(error => {
            logger.error("Error Updating Feedback");
            res.status(400).json({ message: error.message });
        });
}

const deleteFeedback = (req, res) => {
    const id = req.params.id;
    Feedback.deleteOne({ id: id })
        .then(response => {
            logger.info("Succesfully Deleted Feedback");
            res.status(200).json({ response });
        })
        .catch(error => {
            logger.error("Error Deleting Feedback");
            res.status(400).json({ message: error.message });
        });

}

const getTotalFeedbackCount = (req, res, next) => {
    Feedback.countDocuments()
        .then(count => {
            logger.info("Succesfully got Feedback count");
            res.status(200).json({ count });
        })
        .catch(error => {
            logger.error("Error getting Feedback count");
            res.status(400).json({ message: error.message });
        });
};






export default { getFeedback, addFeedback, updateFeedback, deleteFeedback, getFeedbackById, getTotalFeedbackCount };