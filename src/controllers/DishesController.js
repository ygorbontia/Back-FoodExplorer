const knex = require("../database/knex");

class DishesController {
  async create(req, res) {
    const { user_id } = req.params;
    const { name, price, description, category, ingredients } = req.body;

    const [ dishes_id ] = await knex("dishes").where({ user_id }).insert({
      user_id,
      name,
      price,
      description,
      category
    });

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        dishes_id,
        name: ingredient
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    return res.json();
  }
}

module.exports = DishesController;