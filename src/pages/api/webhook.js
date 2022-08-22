//import { buffer } from "micro";
//import * as admin from "firebase-admin";

////const serviceAccount = require('../../../permissions.json');
////Secure con to firebae in the backend
//import serviceAccount from "../../../permissions.json";

//const app = !admin.apps.length
//  ? admin.initializeApp({
//      credential: admin.credential.cert(serviceAccount),
//    })
//  : admin.app();

////Establish connection to stripe
//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

//const fulfillOrder = async (session) => {
//  //  console.log("fulfilling order ", session);

//  return app
//    .firestore()
//    .collection("users")
//    .doc(session.metadata.email)
//    .collection("orders")
//    .doc(session.id)
//    .set({
//      amount: session.amount_total / 100,
//      amount_shipping: session.total_details.amount_shipping / 100,
//      images: JSON.parse(session.metadata.images),
//      timestamp: admin.firestore.FieldValue.serverTimestamp(),
//    })
//    .then(() => {
//      console.log(`SUCCESS: order ${session.id} has been added into DB`);
//    })
//    .catch((err) => {
//      console.log(`Error: ${err.message}`);
//    });
//};

//export default async (req, res) => {
//  if (req.method === "POST") {
//    const requestBuffer = await buffer(req);
//    const payload = requestBuffer.toString();
//    const sig = req.headers["stripe-signature"]; //signature

//    let event;
//    //verify that the req is from the webhook
//    try {
//      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//    } catch (err) {
//      console.log("Error: ", err.message);
//      return res.status(400).send("Webhooks error: ", err.message);
//    }

//    console.log(event.type);
//    //Handle the checkout.session.completed.event
//    if (event.type === "checkout.session.completed") {
//      const session = event.data.object;

//      //fullfill the order
//      return fulfillOrder(session)
//        .then(() => res.status(200))
//        .catch((err) => res.status(400).send(`Webhook error: ${err.message}`));
//    }
//  }
//  //if(req.method === 'GET')
//};

//export const config = {
//  api: {
//    bodyParser: false,
//    externalResolver: true,
//  },
//};
