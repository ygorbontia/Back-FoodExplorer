const AppError = require("../utils/AppError");
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

  async update(req, res) {
    const { id } = req.params;
    const { name, price, description, category, ingredients } = req.body;

    const dish = await knex("dishes").where({ id }).first();
    if (!dish) {
      throw new AppError("O prato não foi encontrado.");
    }
    
    dish.name = name ?? dish.name;
    dish.name = price ?? dish.price;
    dish.name = description ?? dish.description;
    dish.name = category ?? dish.category;

    await knex("dishes").where({ id }).update({
      name: dish.name,
      price: dish.price,
      description: dish.description,
      category: dish.category
    })

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        dishes_id: id,
        name: ingredient
      }
    })

    await knex("ingredients").where("dishes_id", id).delete();

    await knex("ingredients").insert(ingredientsInsert);

    return res.json();
  }
}

module.exports = DishesController;