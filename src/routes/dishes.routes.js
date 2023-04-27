const { Router } = require("express");
const dishesRoutes = Router();

const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

const DishesController = require("../controllers/DishesController");
const dishesController = new DishesController();

const ensureAuthentication = require("../middlewares/ensureAuthentication");

dishesRoutes.use(ensureAuthentication);

dishesRoutes.post("/", dishesController.create);
dishesRoutes.put("/:id", dishesController.update, upload.any);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.get("/", dishesController.showAll);

module.exports = dishesRoutes;