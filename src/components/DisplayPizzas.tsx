import Pizza from "../models/Pizza";
import SinglePizza from "./SinglePizza";

interface DisplayPizzasProps {
  pizzasList: Pizza[];
  updatePizza: (newPizza: Pizza) => void;
  deletePizza: (id: number) => void;
}

const DisplayPizzas = ({
  pizzasList,
  updatePizza,
  deletePizza,
}: DisplayPizzasProps): JSX.Element => {
  return (
    <div className="container">
      {pizzasList.map((pizza) => (
        <SinglePizza
          key={pizza.id}
          updatePizza={updatePizza}
          deletePizza={deletePizza}
          pizza={pizza}
        />
      ))}
    </div>
  );
};

export default DisplayPizzas;
