import Complaint from '../models/complaintModel.js';
import logger from "../utils/logger.js";

const getComplaint = (req, res) => {
    Complaint.find()
        .then(response => {
            logger.info("Succesfully fetched Complaints");
            res.status(200).json({ response });
        })
        .catch(error => {
            logger.error("Error Fetching Complaints");
            res.status(400).json({ message: error.message });
        });
};

const addComplaint = (req, res) => {

    const complaint = new Complaint({
        name: req.body.cname,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type,
        subject: req.body.subject,
        complaint: req.body.complaint,
    });
    complaint.save()
        .then(response => {

            logger.info("Succesfully made Complaint");
            res.status(200).json({ response });
        })
        .catch(error => {
            logger.error("Error Creating Complaint");
            res.status(400).json({ message: error.message });
        });
};

const updateComplaint = (req, res) => {
    const { name, email, phone, type, subject, complaint } = req.body;

    Complaint.updateOne({ name: name }, { $set: { email: email, phone: phone, type: type, subject: subject, complaint: complaint } })
        .then(response => {
            logger.info("Succesfully Updated Complaint with");
            res.status(200).json({ response });
        })
        .catch(error => {
            logger.error("Error Updating Complaint");
            res.status(400).json({ message: error.message });
        });
}

const deleteComplaint = (req, res) => {

    Complaint.deleteOne({ _id: req.params.id })
        .then(response => {
            logger.info("Succesfully Deleted Complaint with id : " + req.params.id);
            res.status(200).json({ response });
        })
        .catch(error => {
            logger.error("Error Deleting Complaint with id : " + req.params.id);
            res.status(400).json({ message: error.message });
        });

}

const getTotalComplaintCount = (req, res) => {
    Complaint.countDocuments()
        .then(count => {
            logger.info("Succesfully Got Complaint Count");
            res.status(200).json({ count });
        })
        .catch(error => {
            logger.error("Error Getting Complaint Count");
            res.status(400).json({ message: error.message });
        });
};

export default { getComplaint, addComplaint, updateComplaint, deleteComplaint, getTotalComplaintCount };