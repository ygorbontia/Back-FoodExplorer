const { Router } = require("express");
const routes = Router();

const userRoutes = require("./users.routes");

routes.use("/user", userRoutes);

module.exports = routes;