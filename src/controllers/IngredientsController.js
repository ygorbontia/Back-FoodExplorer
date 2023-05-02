const knex = require("../database/knex");

class IngredientsController {
  async showAll(req, res) {
    const { id } = req.params;

    const ingredients = await knex("ingredients").where({ dishes_id: id });

    return res.json(ingredients);
  }
}

module.exports = IngredientsController;