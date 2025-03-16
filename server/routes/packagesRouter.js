import express from "express";
import {
  createPackage,
  deletePackage,
  getAllPackages,
  getPackageById,
  updatePackage,
} from "../controller/packageController.js";
import {
  createCusPackage,
  getBoughtPackageById,
  getInApprovedCusPackage
} from "../controller/CusBuyPackageController.js";
import authorizeUser from "../middleware/authorizeUser.js";

const packagesRouter = express.Router();

packagesRouter.post("/add", authorizeUser, createPackage);
packagesRouter.get("/getall", getAllPackages);
packagesRouter.get("/get/:id", getPackageById);
packagesRouter.put("/update", authorizeUser, updatePackage);
packagesRouter.delete("/delete/:id", authorizeUser, deletePackage);

packagesRouter.post("/buy", authorizeUser, createCusPackage);
packagesRouter.get("/getfalse", authorizeUser, getInApprovedCusPackage);
packagesRouter.get("/boughts/:id", authorizeUser, getBoughtPackageById);

export default packagesRouter;