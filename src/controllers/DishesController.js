const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class DishesController {
  async create(req, res) {
    const user_id = req.user.id;
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
        title: ingredient
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    return res.json("Prato criado com sucesso.");
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, price, description, category, ingredients } = req.body;

    const dish = await knex("dishes").where({ id }).first();
    if (!dish) {
      throw new AppError("O prato não foi encontrado.");
    }
    
    dish.name = name ?? dish.name;
    dish.price = price ?? dish.price;
    dish.description = description ?? dish.description;
    dish.category = category ?? dish.category;

    await knex("dishes").where({ id }).update({
      name: dish.name,
      price: dish.price,
      description: dish.description,
      category: dish.category,
      updated_at: knex.fn.now()
    })

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        dishes_id: id,
        title: ingredient
      }
    })

    await knex("ingredients").where("dishes_id", id).delete();

    await knex("ingredients").insert(ingredientsInsert);

    return res.json("As alterações foram salvar com sucesso.");
  }

  async delete(req, res) {
    const { id } = req.params;

    const dish = await knex("dishes").where({ id }).first();
    if (!dish) {
      throw new AppError("O prato não foi encontrado.");
    }

    await knex("dishes").where({ id }).delete();

    return res.json("O prato foi excluído com sucesso.");
  }

  async show(req, res) {
    const { id } = req.params;

    const dish = await knex("dishes").where({ id }).first();
    if (!dish) {
      throw new AppError("O prato não foi encontrado.");
    }

    return res.json(dish);
  }

  async showAll(req, res) {
    const { name } = req.query;
    let dishes

    if (name) {
      dishes = await knex("ingredients").select([ "dishes.id", "dishes.name", "dishes.price", "dishes.description", "dishes.category", "dishes.image", "ingredients.title" ])
        .whereLike("dishes.name", `%${ name }%`)
        .innerJoin("dishes", "dishes.id", "ingredients.dishes_id");
    } else {
      dishes = await knex("ingredients").select([ "dishes.id", "dishes.name", "dishes.price", "dishes.description", "dishes.category", "dishes.image", "ingredients.title" ])
        .innerJoin("dishes", "dishes.id", "ingredients.dishes_id");
    }


    return res.json(dishes)
  }
}

module.exports = DishesController;