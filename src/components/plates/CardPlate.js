import { Card } from "antd";
import React from "react";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const CardPlate = ({ image, name, description, ingredients }) => {
  return (
    <Card className="card-plate b-shadow">
      <div className="d-flex  h-100 w-100">
        <div className="card-plate-img-container h-100">
          <img
            src={`${backendUrl}${image}`}
            className="card-plate-img"
            alt="plate"
          />
        </div>
        <div className="card-plate-content-container h-100 card-plate-content">
          <h3>{name}</h3>
          <p>{description}.</p>
          <h3>Ingredientes: </h3>
          <ul>
            {ingredients.map((ingredient) => (
              <li>
                <b>{ingredient.name}</b> : {ingredient.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
