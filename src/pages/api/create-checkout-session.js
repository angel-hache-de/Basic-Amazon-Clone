//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
////endpoint in next.js
//export default async (req, res) => {
//  const { items, email } = req.body;

//  const transformedItems = items.map((item) => ({
//    price_data: {
//      currency: "mxn",
//      product_data: {
//        name: item.title,
//        images: [item.image],
//      },
//      unit_amount: item.price * 100 ,
//    },
//    description: item.description,
//    quantity: 1,
//  }));

//  const session = await stripe.checkout.sessions.create({
//    payment_method_types: ["card"],
//    shipping_rates: ["shr_1KCUpTEd5mAvzR2WZNYUIhnw"],
//    shipping_address_collection: {
//      allowed_countries: ["MX", "US", "CA"],
//    },
//    line_items: transformedItems,
//    mode: "payment",
//    success_url: `${process.env.HOST}/success`,
//    cancel_url: `${process.env.HOST}/checkout`,
//    metadata: {
//      email,
//      images: JSON.stringify(items.map((item) => item.image)),
//    },
//  });

//  res.status(200).json({
//    id: session.id,
//  });
//};
