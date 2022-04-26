import express from "express";
import robinController from "../controllers/robinController";


let router = express.Router();

let initWebRoutes = (app) => {
    
    router.post("/getRobin", robinController.getRobin);

    router.get("/getRobin", robinController.getRobin_1);

    router.get("/", robinController.getHomePage);


    return app.use("/", router);
};

module.exports = initWebRoutes;
