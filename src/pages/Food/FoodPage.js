import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Price from '../../components/Price/Price';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import { getById } from '../../services/foodService';
import classes from './foodPage.module.css';
import { sample_foods } from '../../data';

export default function FoodPage() {
  const [food, setFood] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const idFood = sample_foods.find(item => item.id == id);
  
    if (idFood) {
      setFood(idFood);
    } else {
      console.error(`Alimento con ID ${id} no encontrado.`);
    }
  }, [id]);
  


  
  
 

  return (
    <>
    <p>Food page </p>
      {food && (
        <div className={classes.container}>
          <img src={food.imageUrl} alt={food.name}></img>

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? '' : classes.not
                }`}
              >
                ❤
              </span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>

            <div className={classes.origins}>
              {food.origins?.map(origin => (
                <span key={origin}>{origin}</span>
              ))}
            </div>

            <div className={classes.tags}>
              {food.tags && (
                <Tags
                  tags={food.tags.map(tag => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>

            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>

            <div className={classes.price}>
              <Price price={food.price} />
            </div>

            <button>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}