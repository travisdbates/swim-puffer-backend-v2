require('dotenv').config();
const stripe = require('../constants/stripe');

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr, submitPayment: false });
  } else {
    res.status(200).send({ success: stripeRes, submitPayment: true});
  }
}

const paymentApi = app => {
  app.get(`/${process.env.PAYMENT_URL}`, (req, res) => {
    res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
  });

  app.post(`/${process.env.PAYMENT_URL}`, (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res));
  });

  return app;
};

module.exports = paymentApi;