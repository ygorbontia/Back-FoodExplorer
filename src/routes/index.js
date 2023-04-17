const { Router } = require("express");
const routes = Router();

const userRoutes = require("./users.routes");
const dishesRoutes = require("./dishes.routes");

routes.use("/user", userRoutes);
routes.use("/dishes", dishesRoutes);

module.exports = routes;