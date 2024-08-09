import React, { ChangeEvent, FormEvent, useState } from "react";
import "./styles.css";
import Pizza from "../models/Pizza";

interface AddPizzaFormProps {
  addPizza: (newPizza: Pizza) => void;
}

type PizzaForm = {
  title: string;
  price: string;
  img: string;
};

const initState: PizzaForm = {
  title: "",
  price: "",
  img: "",
};

const AddPizzaForm = ({ addPizza }: AddPizzaFormProps): JSX.Element => {
  const [newPizza, setNewPizza] = useState<PizzaForm>(initState);
  const [errors, setErrors] = useState<{ title?: string; price?: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPizza((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Убираем ошибку при изменении
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { title?: string; price?: string } = {};

    // Проверка на пустое название
    if (!newPizza.title) {
      newErrors.title = "Title is required";
    }

    // Проверка на цену
    if (!newPizza.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(newPizza.price))) {
      newErrors.price = "Price must be a number";
    }

    // Если есть ошибки, остановить отправку
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const pizzaToAdd: Pizza = {
      id: Date.now(), // Генерация уникального ID
      title: newPizza.title,
      price: Number(newPizza.price),
      img: newPizza.img || "pizza-1.jpg", // Устанавливаем изображение по умолчанию
    };

    addPizza(pizzaToAdd);
    setNewPizza(initState); // Сбрасываем форму после отправки
  };

  return (
    <form onSubmit={handleSubmit} className="add-pizza-form">
      <div className="form-group">
        <input
          name="title"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={newPizza.title}
          className={errors.title ? "error" : ""}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      <div className="form-group">
        <input
          name="price"
          type="text"
          placeholder="Price"
          onChange={handleChange}
          value={newPizza.price}
          className={errors.price ? "error" : ""}
        />
        {errors.price && <span className="error-message">{errors.price}</span>}
      </div>
      <div className="form-group">
        <input
          name="img"
          type="text"
          placeholder="Image URL"
          onChange={handleChange}
          value={newPizza.img}
        />
      </div>
      <button type="submit">+ Add to menu</button>
    </form>
  );
};

export default AddPizzaForm;
