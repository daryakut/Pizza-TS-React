import { useEffect, useState } from "react";
import "./App.css";
import AddPizzaForm from "./components/AddPizzaForm";
import Pizza from "./models/Pizza";
import DisplayPizzas from "./components/DisplayPizzas";
import demoPizzas from "./demoPizzas";

const App = (): JSX.Element => {
  const [pizzasList, setPizzasList] = useState<Pizza[]>([]);

  // Загружаем данные из localStorage при загрузке компонента
  useEffect(() => {
    const storedPizzas = localStorage.getItem("pizzasList");
    if (storedPizzas) {
      setPizzasList(JSON.parse(storedPizzas));
    } else {
      setPizzasList(demoPizzas); // Если ничего нет в localStorage, используем демо данные
    }
  }, []);

  // Сохраняем данные в localStorage при каждом обновлении списка пицц
  useEffect(() => {
    if (pizzasList.length > 0) {
      localStorage.setItem("pizzasList", JSON.stringify(pizzasList));
    }
  }, [pizzasList]);

  const addPizza = (newPizza: Pizza) => {
    const updatedPizzasList = [...pizzasList, newPizza];
    setPizzasList(updatedPizzasList);
  };

  const updatePizza = (newPizza: Pizza) => {
    const updatedPizzasList = pizzasList.map((pizza) =>
      pizza.id === newPizza.id ? newPizza : pizza
    );
    setPizzasList(updatedPizzasList);
  };

  const deletePizza = (id: number) => {
    const updatedPizzasList = pizzasList.filter((pizza) => pizza.id !== id);
    setPizzasList(updatedPizzasList);
  };

  return (
    <div className="App">
      <div className="wrap">
        <span className="heading">Our pizza</span>
        <AddPizzaForm addPizza={addPizza} />
        <DisplayPizzas
          pizzasList={pizzasList}
          updatePizza={updatePizza}
          deletePizza={deletePizza}
        />
      </div>
    </div>
  );
};

export default App;
