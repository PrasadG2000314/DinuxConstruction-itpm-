import PackageAddon from "../models/packageAddon.js";
import logger from "../utils/logger.js"

//insert new packageAddon into database if user have  package in privileges
export function createPackageAddon(req, res) {

    const { price, description, duration } = req.body;
    const newPackageAddon = new PackageAddon({

        price: price,
        description: description,
        duration: duration,

    });
    newPackageAddon
        .save()
        .then((result) => {
            logger.info("Succesfully Created package Addon");
            res.status(200).json(result);
        })
        .catch((error) => {
            logger.error("Error Creating Package Addon");
            res.status(400).json({ message: error.message });
        });
}

//update existing packageAddon if user have  package in privileges by id
export function updatePackageAddon(req, res) {

    const { id, price, description, duration } = req.body;
    //update packageAddon by id
    PackageAddon
        .updateOne(
            { _id: id },
            {
                $set: {

                    price: price,
                    description: description,
                    duration: duration,

                },
            }
        )
        .then((result) => {
            logger.info("Succesfully Updated package Addon");
            res.status(200).json(result);
        })
        .catch((error) => {
            logger.error("Error Updating Package Addon");
            res.status(400).json({ message: error.message });
        });
}

//delete existing packageAddon if user have  package in privileges by id
export function deletePackageAddon(req, res) {
    //delete packageAddon by id
    PackageAddon
        .deleteOne({ _id: req.params.id })
        .then((result) => {
            logger.info("Succesfully Deleted package Addon with Id : " + req.params.id);
            res.status(200).json(result);
        })
        .catch((error) => {
            logger.error("Error Deelting package Addon with Id : " + req.params.id);
            res.status(400).json({ message: error.message });
        });
}

//get all packageAddons if user have  package in privileges
export function getAllPackageAddons(req, res) {

    //get all packageAddons
    PackageAddon
        .find()
        .then((result) => {
            logger.info("Succesfully Got all package Addon Details");
            res.status(200).json(result);
        })
        .catch((error) => {
            logger.error("Error Getting all package Addon Details");
            res.status(400).json({ message: error.message });
        });
}

//get packageAddon by id if user have  package in privileges
export function getPackageAddonById(req, res) {

    PackageAddon
        .findById(req.params.id)
        .then((result) => {
            logger.info("Succesfully got package Addon Details by Id");
            res.status(200).json(result);
        })
        .catch((error) => {
            logger.error("Error Getting package Addon Details By id");
            res.status(400).json({ message: error.message });
        });
}
