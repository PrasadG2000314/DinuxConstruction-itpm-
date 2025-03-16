import { UserType } from "../utils/enums/UserEnums.js";
import logger from "../utils/logger.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authorizeUser = async (req, res, next) => {

    let token = req.headers.authorization;

    if (token) {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        const accessRules = {
            [UserType.ADMIN]: ['/user', '/employee', '/customer', '/site', '/package', '/finance', '/biller', '/stock', '/packageaddon', '/fleet', '/vehicle'],
            [UserType.HR_MANAGER]: ['/user', '/employee'],
            [UserType.SITE_MANAGER]: ['/user', '/employee/search', '/employee/update', '/site', '/package', '/customer/search', '/packageaddon', '/stock/getall'],
            [UserType.FINANCE_MANAGER]: ['/user', '/employee/search', '/employee/update', '/finance', '/biller', 'customer/search'],
            [UserType.STOCK_MANAGER]: ['/user', '/employee/search', '/employee/update', '/stock'],
            [UserType.FLEET_MANAGER]: ['/user', '/employee/search', '/employee/update', '/fleet', '/vehicle'],
            [UserType.CUSTOMER_RELATIONSHIP_MANAGER]: ['/user', '/employee/search', '/employee/update'],
            [UserType.CUSTOMER]: ['/user', '/customer', '/site/getall', '/site/get', '/site/getrequest', '/site/getstatus', '/package/get', '/package/getall', '/package/buy', '/package/boughts', '/packageaddon/getbyid', '/packageaddon/getall', '/finance/cuspay', '/finance/getall'],
            [UserType.DRIVER]: ['/user', '/employee/search', '/employee/update'],
            [UserType.WORKER]: ['/user', '/employee/search', '/employee/update'],
        };

        const urlPrefix = "/" + req.originalUrl.split('/')[1];
        const urlPrefix2 = urlPrefix + "/" + req.originalUrl.split('/')[2];
        const hasAccess = accessRules[user.userType]?.includes(urlPrefix);
        const hasAccess2 = accessRules[user.userType]?.includes(urlPrefix2);

        if (hasAccess || hasAccess2) {
            logger.info(`[${user._id}]: [${req.method}] [${req.originalUrl}] Request Received`);
            next();
        } else {
            logger.info("User Access Revoked");
            res.status(403).json({ message: 'Unauthorized' });
        }
    } else {

        const accessRules = {
            ["non-logined"]: ['/user/login', '/package', '/customer']
        };

        const urlPrefix = "/" + req.originalUrl.split('/')[1];
        const urlPrefix2 = urlPrefix + "/" + req.originalUrl.split('/')[2];
        const hasAccess = accessRules["non-logined"]?.includes(urlPrefix);
        const hasAccess2 = accessRules["non-logined"]?.includes(urlPrefix2);

        if (hasAccess || hasAccess2) {
            next();
        } else {
            logger.info("User Access Revoked");
            res.status(403).json({ message: 'Unauthorized' });
        }
    }
}

export default authorizeUser;