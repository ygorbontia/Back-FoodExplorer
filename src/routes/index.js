const { Router } = require("express");
const routes = Router();

const userRoutes = require("./users.routes");
const dishesRoutes = require("./dishes.routes");
const sessionsRoutes = require("./sessions.routes");

routes.use("/user", userRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;