const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const emailAlreadyExists = await knex("user").where({ email }).first();
    if (emailAlreadyExists) {
      throw new AppError("Este e-mail já está em uso.");
    };

    return res.json();
  };
};

module.exports = UserController;