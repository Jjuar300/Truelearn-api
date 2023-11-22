require('dotenv').config(); 
const express = require('express'); 
const router = express.Router(); 
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


const addTrailZeros = (length, number) => {
 let numberString = number.toString(); 
 const zerosToAdd = length - numberString.length; 

 for(let i = 0; i < zerosToAdd; i++){
  numberString = numberString + '0'
 }
 if(numberString.length === 5)
return numberString
}

router.post('/create-checkout-session', async (req, res) => {
 
  const ProductPrice = req.body.ProductPrice; 
  const FinalProductPrice = addTrailZeros(5, ProductPrice)

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency:'usd', 
          product_data:{
            name:req.body.ProductName,
          },
          unit_amount:Number(FinalProductPrice) ,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/mycourses`,
    cancel_url: `${process.env.CLIENT_URL}`,
  });

  res.send({url: session.url});
});

module.exports = router;