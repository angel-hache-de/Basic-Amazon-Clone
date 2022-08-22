//import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import moment from "moment";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "../firestore/firebase";
import Header from "../components/Header";
import Order from "../components/Order";

function orders({orders}) {
  const { data: session } = useSession();
  //const [orders, setOrders] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);

  //useEffect(() => {
  //  if (!session) return;

  //  setIsLoading(true);
  //  let unsubscribe = false;
  //  //console.log(session);
  //  const fetchOrders = async () => {
  //    const querySnapshot = await getDocs(
  //      query(
  //        collection(db, "users", session.user.email, "orders"),
  //        orderBy("timestamp", "desc")
  //      )
  //    );
  //    if (unsubscribe) return;
  //    const queryOrders = [];
  //    querySnapshot.forEach((doc) => queryOrders.push(doc.data()));

  //    //setOrders(querySnapshot.map(doc => doc.data()));
  //    setOrders(queryOrders);
  //    setIsLoading(false);
  //  };

  //  fetchOrders();

  //  return () => {
  //    unsubscribe = true;
  //  };
  //}, [session]);

  return (
    <div className="">
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your orders
        </h1>

        {
        //isLoading ? (
        //  <h2>Loading...</h2>
        //) : 
        session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>SignIn to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map(({ amount, items, timestamp }, i) => (
            <Order
              key={`${timestamp}`}
              id={i}
              amount={amount}
              items={items}
              timestamp={timestamp}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default orders;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session)
    return {
      props: {
        orders: [],
      },
    };

  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, "users", session.user.email, "orders"),
        orderBy("timestamp", "desc")
      )
    );

    const queryOrders = [];
    querySnapshot.forEach((doc) => queryOrders.push({
      ...doc.data(),
      timestamp: moment(doc.data().timestamp.toDate()).unix()
    }));

    return {
      props: {
        orders: queryOrders,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        orders: [],
      },
    };
  }
}

//This is nodejs
//export async function getServerSideProps(context) {
//  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//  //get the user logged in
//  const session = await getSession(context);
//  if (!session) {
//    return {
//      props: {},
//    };
//  }

//  //firestore db
//  const stripeOrders = await db
//    .collection("users")
//    .doc(session.user.email)
//    .collection("orders")
//    .orderBy("timestamp", "desc")
//    .get();

//  //Stripe ordes
//  const orders = await Promise.all(
//    stripeOrders.docs.map(async (order) => ({
//      id: order.id,
//      amount: order.data().amount,
//      amountShipping: order.data().amount_shipping,
//      images: order.data().images,
//      timestamp: moment(order.data().timestamp.toDate()).unix(),
//      items: (
//        await stripe.checkout.sessions.listLineItems(order.id, {
//          limit: 100,
//        })
//      ).data,
//    }))
//  );

//  return {
//    props: {
//      orders,
//    },
//  };
//}
