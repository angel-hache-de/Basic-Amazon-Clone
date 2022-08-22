import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-format";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const [rating, setRating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const dispatch = useDispatch();
  const [hasPrime] = useState(Math.random() < 0.5);

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };
    //Sending the product as an action to the redux store
    dispatch(addToBasket(product));
  };

  return (
    <div className="max-w-md md:max-w-none relative flex flex-col my-3 mx-auto md:mx-2 bg-white z-30 p-4">
      <p
        className="absolute top-2 right-2 text-xs italic
       text-gray-400 "
      >
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit="contain"></Image>

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {/* Dice que no importa el primer valor */}
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        ${price}
        {/*<Currency quantity={price} currency="GBP"></Currency>*/}
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-2">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
