

const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
const { default: Stripe } = require('stripe');

dotenv.config();

const server = express()

server.use(cors());
server.use(express.json())
server.use(express.urlencoded({ extended: true }));

server.get('/ping', (req, res) => {
    res.status(200).json({
        message: 'pong :)'
    })
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20'
});

server.post('/payment-intention', async (req, res) => {
    const { amount } = req.body;

    try {
        // criação do payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd'
        });

        // retorna o clientSecret

        res.json({
            clientSecret: paymentIntent.client_secret
        });

    }catch(err){
        res.status(500).json({error: err.message})
    }
})

server.listen(process.env.PORT || 8080, () => console.log(`Server is running on port ${process.env.PORT || 8080}`));
