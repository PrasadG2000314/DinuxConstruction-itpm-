import packageModel from "../models/Package.js";
import logger from '../utils/logger.js'

//insert new package into database
export function createPackage(req, res) {
  const {
    name,
    price,
    description,
    duration,
    homeImage,
    modelLink,
    cost,
  } = req.body;
  const newPackage = new packageModel({
    name: name,
    price: price,
    description: description,
    homeImage: homeImage,
    modelLink: modelLink,
    duration: duration,
    cost: cost,
  });
  newPackage
    .save()
    .then((result) => {
      logger.info("Succesfully Created package");
      res.status(200).json(result);
    })
    .catch((error) => {
      logger.error("Error Getting Package Details");
      res.status(400).json({ message: error.message });
    });
}

//update existing package if user have  package in privileges by id
export function updatePackage(req, res) {
  const {
    name,
    price,
    description,
    duration,
    homeImage,
    modelLink,
    cost,
  } = req.body;

  packageModel
    .updateOne(
      { _id: req.body.id },
      {
        $set: {
          name: name,
          price: price,
          description: description,
          duration: duration,
          homeImage: homeImage,
          cost: cost
        },
      }
    )
    .then((result) => {
      logger.info("Succesfully Updated package");
      res.status(200).json(result);
    })
    .catch((error) => {
      logger.error("Error Getting Package Details");
      res.status(400).json({ message: error.message });
    });
}

//delete existing package by id
export function deletePackage(req, res) {
  packageModel
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      logger.info("Succesfully Deleted package by Id : " + req.params.id);
      res.status(200).json(result);
    })
    .catch((error) => {
      logger.error("Error Deleting package by Id : " + req.params.id);
      res.status(400).json({ message: error.message });
    });
}

export function getAllPackages(req, res) {
  packageModel
    .find()
    .then((result) => {
      logger.info("Succesfully Got All Packages");
      res.status(200).json(result);
    })
    .catch((error) => {
      logger.error("Error Getting All Packages");
      res.status(400).json({ message: error.message });
    });
}

//get package by id if user have package in privileges
export function getPackageById(req, res) {
  packageModel
    .findOne({ _id: req.params.id })
    .then((result) => {
      logger.info("Succesfully Got Package by Id");
      res.status(200).json(result);
    })
    .catch((error) => {
      logger.error("Error Getting Package by Id");
      res.status(400).json({ message: error.message });
    });
}
