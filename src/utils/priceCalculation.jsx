import pizza from "../assets/pizza.json";

export function totalPrice({
  pizzaSize,
  pizzaDough,
  pizzaBase,
  pizzaIngredients,
}) {
  let total = 0;

  //   PRICE FOR SIZE
  total += pizza.price_base + ((pizzaSize - 20) / 10) * pizza.price_per_size;

  //   PRICE FOR DOUGH

  const dough = pizza.dough.filter((elem) => elem.type === pizzaDough);
  total += dough[0].price;

  //   PRICE FOR BASE

  const base = pizza.base.filter((elem) => elem.type === pizzaBase);
  total += base[0].price;

  //   PRICE FOR INGREDIENT

  const ingredients = pizzaIngredients
    .map((ingredient) => {
      return pizza.ingredients.filter((elem) => elem.type === ingredient)[0]
        .price;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  total += ingredients;

  return total;
}
