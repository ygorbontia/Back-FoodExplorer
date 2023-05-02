const knex = require("../database/knex");

class IngredientsController {
  async showAll(req, res) {
    const { dishes_id } = req.params;

    const ingredients = await knex("ingredients").where({ dishes_id });

    return res.json(ingredients);
  }
}

module.exports = IngredientsController;