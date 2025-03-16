import express from "express";
import cors from "cors";
import "dotenv/config";
import customerRouter from './routes/CustomerRouter.js';
import userRouter from "./routes/UserRouter.js";
import employeeRouter from "./routes/EmployeeRouter.js";
import siteRouter from "./routes/SiteRouter.js";
import paymentRouter from "./routes/PaymentRouter.js";
import billerRouter from "./routes/BillerRouter.js";
import stockRouter from "./routes/StockRouter.js";
import FleetRouter from "./routes/FleetRouter.js";
import vehicleRouter from "./routes/VehicleRouter.js";
import packagesRouter from "./routes/PackagesRouter.js";
import packageAddOnRouter from "./routes/packageAddOnsRouter.js";
import authRouter from "./routes/authRouter.js";
import complaintRouter from "./routes/ComplaintRouter.js";
import feedbackRouter from "./routes/feedbackRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

//Including Routers
app.use('/user', userRouter);
app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/site', siteRouter);
app.use('/finance', paymentRouter);
app.use('/biller', billerRouter);
app.use('/stock', stockRouter);
app.use('/fleet', FleetRouter);
app.use('/vehicle', vehicleRouter);
app.use('/package', packagesRouter);
app.use('/packageaddon', packageAddOnRouter);
app.use('/auth', authRouter);
app.use('/complaint', complaintRouter);
app.use('/feedback', feedbackRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
});

export default app;