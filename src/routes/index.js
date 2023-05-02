const { Router } = require("express");
const routes = Router();

const userRoutes = require("./users.routes");
const dishesRoutes = require("./dishes.routes");
const sessionsRoutes = require("./sessions.routes");
const ingredientsRoutes = require("./ingredients.routes");

routes.use("/user", userRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/ingredients", ingredientsRoutes);

module.exports = routes;