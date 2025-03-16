import express from 'express'
import SiteController from '../controller/SiteController.js'
import authorizeUser from '../middleware/authorizeUser.js';

const siteRouter = express.Router();

siteRouter.get("/getall", authorizeUser, SiteController.getAllSites);
siteRouter.get("/get/:id", authorizeUser, SiteController.getAllSitesByCustId);
siteRouter.get("/getid", authorizeUser, SiteController.generateSiteId);
siteRouter.get("/getstatus/:id", authorizeUser, SiteController.calculateCompleteStatus);
siteRouter.post("/create", authorizeUser, SiteController.createSite);
siteRouter.put("/update", authorizeUser, SiteController.updateSite);
siteRouter.delete("/delete/:id", authorizeUser, SiteController.deleteSite);

siteRouter.post("/request", authorizeUser, SiteController.stockRequest);
siteRouter.put("/requpdate", authorizeUser, SiteController.updateStockRequestStatus);
siteRouter.get("/getrequest/:id", authorizeUser, SiteController.getStockRequests);
siteRouter.get("/getrequeststatus/:status", authorizeUser, SiteController.getStockRequestsByStatus);

export default siteRouter;