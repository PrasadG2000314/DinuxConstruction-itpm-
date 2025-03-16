import cusPackageBuyModel from "../models/CusPackageBuy.js";
import logger from '../utils/logger.js'

export function createCusPackage(req, res) {
  const {
    name,
    price,
    description,
    duration,
    cost,
    cusId,
    isApproved,
  } = req.body;

  const formattedDescription = description.join(', ');

  const newCusPackage = new cusPackageBuyModel({
    name: name,
    price: price,
    description: formattedDescription,
    duration: duration,
    cost: cost,
    cusId: cusId,
    isApproved: isApproved,
  });
  newCusPackage
    .save()
    .then((result) => {
      logger.info("Package Bought by " + cusId);
      res.status(200).json(result);
    })
    .catch((error) => {
      logger.error("Error Buying package");
      res.status(400).json({ message: error.message });
    });
}

export function getInApprovedCusPackage(req, res) {

  cusPackageBuyModel
    .find({ isApproved: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      logger.error("Error getting InApproved package");
      res.status(400).json({ message: error.message});
    });

}

export function getBoughtPackageById(req, res) {

  cusPackageBuyModel.findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });

}