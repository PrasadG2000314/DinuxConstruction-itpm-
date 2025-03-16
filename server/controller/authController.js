import Auth from '../models/authModel.js';
import logger from "../utils/logger.js";

const getAuth = (req, res) => {
    Auth.find()
        .then(response => {
            logger.info("Succesfully fetched Auth Details");
            res.status(200).json({ response });
        })
        .catch(error => {
            logger.error("Error Fetching Auth Details");
            res.status(400).json({ message: error.message });
        });
};

const addAuth = (req, res, next) => {
    const auth = new Auth({
        id: req.body.id,
        localauthorityname: req.body.localauthorityname,
        type: req.body.type,
        city: req.body.city,
        place: req.body.place,
        nooffloors: req.body.nooffloors,
        distancecity: req.body.distancecity,
    });
    auth.save()
        .then(response => {
            logger.info("Succesfully Added Auth Details");
            res.status(200).json({ response });
        })
        .catch(error => {
            logger.error("Error Adding Auth Details");
            res.status(400).json({ message: error.message });
        });
};

const updateAuth = (req, res, next) => {
    const { id, localauthorityname, type, city, place, nooffloors, distancecity } = req.body;
    Auth.updateOne({ id: id }, { $set: { localauthorityname: localauthorityname, type: type, city: city, place: place, nooffloors: nooffloors, distancecity: distancecity } })
        .then(response => {
            logger.info("Succesfully Updating Auth Details");
            res.status(200).json({ response });
        })
        .catch(error => {
            logger.error("Error Updating Auth Details");
            res.status(400).json({ message: error.message });
        });
}

const deleteAuth = (req, res, next) => {
    const id = req.params.id;
    Auth.deleteOne({ id: id })
        .then(response => {
            logger.info("Succesfully Deleted Auth Details");
            res.status(200).json({ response });
        })
        .catch(error => {
            logger.error("Error Deleting Auth Details");
            res.status(400).json({ message: error.message });
        });

}

export default { getAuth, addAuth, updateAuth, deleteAuth };