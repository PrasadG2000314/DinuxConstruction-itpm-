import express from "express";
import {
    createPackageAddon,
    updatePackageAddon,
    deletePackageAddon,
    getAllPackageAddons,
    getPackageAddonById,
} from "../controller/PackageAddonController.js";
import authorizeUser from "../middleware/authorizeUser.js";

const packageAddOnRouter = express.Router();

packageAddOnRouter.post("/add", authorizeUser, createPackageAddon);
packageAddOnRouter.get("/getall", getAllPackageAddons);
packageAddOnRouter.get("/getbyid/:id", getPackageAddonById);
packageAddOnRouter.put("/update", authorizeUser, updatePackageAddon);
packageAddOnRouter.delete("/delete/:id", authorizeUser, deletePackageAddon);

export default packageAddOnRouter;