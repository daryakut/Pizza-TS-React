import { useState } from "react";
import Pizza from "../models/Pizza";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import EditPizzaForm from "./EditPizzaForm";

interface SinglePizzaProps {
  pizza: Pizza;
  updatePizza: (newPizza: Pizza) => void;
  deletePizza: (id: number) => void;
}

const SinglePizza = ({
  pizza,
  updatePizza,
  deletePizza,
}: SinglePizzaProps): JSX.Element => {
  const [edit, setEdit] = useState<boolean>(false);

  function handleToggleEdit() {
    setEdit(!edit);
  }

  function handleDeletePizza() {
    deletePizza(pizza.id);
  }

  return (
    <div className="pizza">
      <img src={`/images/${pizza.img}`} alt={pizza.title}></img>
      <h2>{pizza.title}</h2>
      <span>{pizza.price} $</span>
      <div className="pizza-controls">
        <MdOutlineModeEditOutline onClick={handleToggleEdit} />
        <MdDeleteForever onClick={handleDeletePizza} />
      </div>
      {edit ? (
        <EditPizzaForm
          data={pizza}
          updatePizza={updatePizza}
          handleToggleEdit={handleToggleEdit}
        />
      ) : null}
    </div>
  );
};

export default SinglePizza;
