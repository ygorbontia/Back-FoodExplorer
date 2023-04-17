const { Router } = require("express");
const userRoutes = Router();

userRoutes.get("/", (req, res) => {
  return res.json("Olá usuário");
});

module.exports = userRoutes;