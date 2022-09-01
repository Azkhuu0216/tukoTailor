const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret_key);
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.paymentSheet = functions.https.onRequest(async (req, res) => {
  const db = admin.firestore();
  const uid = db.collection("place_order").doc("id");
  const id = await uid.get();
  const cityRef = db.collection("orders").doc(id.data().id);
  const doc = await cityRef.get();
  const price = doc.data().order;
  const code = db.collection("settings").doc("currency");
  const currencyCode = await code.get();
  const cCode = currencyCode.data().code;
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2020-08-27" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price[price.length - 1].order_data[0].price * 100,
    currency: cCode,
    customer: customer.id,
  });
  res.json({
    paymentIntent: paymentIntent,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});
