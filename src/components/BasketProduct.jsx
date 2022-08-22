import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function BasketProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrime,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };

    //Dispatch an event to add an item
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    //Dispatch an event to remove an item
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5 px-5">
      <section className="col-span-5 sm:col-span-1 flex justify-center">
        <Image src={image} height={200} width={200} objectFit="contain" />
      </section>
      {/* Middle */}
      <section className="col-span-5 sm:col-span-4 md:col-span-3">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>${price}
        {/*<Currency quantity={price} currency="GBP"></Currency>*/}
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              className="w-12"
              loading="lazy"
              alt=""
            />

            <p className="text-xs text-gray-500">FREE Next day delivery</p>
          </div>
        )}
      </section>

      {/* Right add and remove buttons */}
      <section className="col-span-5 md:col-span-1 flex flex-col space-y-2 my-auto justify-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </section>
    </div>
  );
}

export default BasketProduct;
