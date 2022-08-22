import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";

function ProductFeed() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const fetchProdutcs = async () => {
      try {
        setError(null);
        const res = await axios.get("https://fakestoreapi.com/products", {
          cancelToken: cancelToken.token,
        });
        setProducts(res.data);
      } catch (error) {
        if(axios.isCancel(error)) return;
        //if(axios.isAxiosError(error))
          setError(error.message);
      }
    };

    fetchProdutcs();

    return () => {
      cancelToken.cancel();
    };
  }, []);

  if(error) return <p>{error}</p>

  return (
    <div
      className="!w-screen px-3 grid grid-flow-row-dense md:grid-cols-2 
        lg:grid-cols-3 xl:grid-cols-4 md:-mt-52"
    >
      {products
        ?.slice(0, 4)
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt=""
      />

      <div className="md:col-span-2">
        {products
          ?.slice(4, 5)
          .map(({ id, title, price, description, category, image }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          ))}
      </div>

      {products
        ?.slice(4, products.length)
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
    </div>
  );
}

export default ProductFeed;
