import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
 const priceForStripe = price * 100; // since "Stripe" wants the price in cents
 const publishableKey =
   "pk_test_51J3ijWSHmczBNSyqs0R3cCOObnezhFE1kpsIeaYIW7KvpHDgLhR9TOufoKU2xRsQeXv5A3FhUNlG7jnCe3Nn1L1I00MsbCmLnn";

  const onToken = token => {
    console.log(token)
    alert('Payment Successful');
  }

  return (
    <StripeCheckout 
    label='Pay Now'
    name='CRWN Clothin Ltd.'
    billingAddress
    shippingAddress
    image='https://svgshare.com/i/CUz.svg'
    description={`Your total is $${price}`}
    amount={priceForStripe}
    panelLabel='Pay Now'
    token={onToken} // Gets triggered on success when we submit
    stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;