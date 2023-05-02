const { Router } = require("express");
const ingredientsRoutes = Router();

const IngredientsController = require("../controllers/IngredientsController");
const ingredientsController = new IngredientsController();

const ensureAuthentication = require("../middlewares/ensureAuthentication");

ingredientsRoutes.get("/:id", ensureAuthentication, ingredientsController.showAll);

module.exports = ingredientsRoutes;