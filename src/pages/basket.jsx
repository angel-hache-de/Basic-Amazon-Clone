import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession } from "next-auth/react";
//import { serverTimestamp } from "firebase/";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { clearBasket, selectItems, selectTotal } from "../slices/basketSlice";
import { db } from "../firestore/firebase";
import Header from "../components/Header";
import BasketProduct from "../components/BasketProduct";

//const stripePromise = loadStripe(process.env.stripe_public_key);

function Basket() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const saveOrder = async () => {
    if (!session) return alert("Sign-in");

    if (items.length === 0) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "users", session.user.email, "orders"), {
        amount: total,
        items,
        timestamp: serverTimestamp(),
      });

      dispatch(clearBasket());
      router.push("/success");
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }

    //app
    //  .firestore()
    //  .collection("users")
    //  .doc(session.user.email)
    //  .collection("orders")
    //  .doc(`${new Date().getTime()}`)
    //  .set({
    //    amount: total,
    //    items,
    //    timestamp: serverTimestamp(),
    //  })
    //  .then(() => {
    //    router.push("/orders");
    //  })
    //  .catch((err) => {
    //    setLoading(false);
    //    alert(error.message);
    //  });
  };

  //const createCheckoutSession = async () => {
  //  const stripe = await stripePromise;

  //  const checkoutSession = await axios.post("/api/create-checkout-session", {
  //    items,
  //    email: session.user.email,
  //  });

  //  //Redirect user to checkout
  //  const result = await stripe.redirectToCheckout({
  //    sessionId: checkoutSession.data.id,
  //  });

  //  if (result.error) alert(result.error.message);
  //};

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your basket is empty" : "Shopping Basket"}
            </h1>

            {items.map((item, i) => (
              <BasketProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                rating={item.rating}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span className="font-bold">
                  {/*<Currency qunatity={} currency="" />*/}
                  {"  "}${total}
                </span>
              </h2>

              <button
                onClick={saveOrder}
                disabled={!session || loading}
                className={`button mt-2 ${
                  (!session || loading) &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300"
                }`}
              >
                {!session
                  ? "Sign to checkout"
                  : loading
                  ? "Processing"
                  : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Basket;
