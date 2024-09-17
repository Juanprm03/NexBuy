import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import type { Token } from 'react-stripe-checkout';

const KEY = 'pk_test_51PzqGkGaIfS1uqpC5WgTY5Sm4vv59dyt1CqCGA2LzVMrbjg7z2gLDB0wVh320xZWJwQEliWcK8Q9zQvrey0PqYcd00wR2nR086';

const Pay = () => {
    const onToken = (token: Token) => {
        console.log(token);
        alert('Payment Successful');
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <StripeCheckout
                token={onToken}
                stripeKey={KEY}
                name="NexBuy"
                image='https://res.cloudinary.com/ddx2rkawo/image/upload/v1726545107/nexbuy/zm3krfnu421gjc3haull.png'
                billingAddress
                shippingAddress
                description="Your total is $50"
                amount={5000} // Amount in cents
            >
            <button className="border-none w-30 rounded-md p-2 bg-black text-white cursor-pointer font-semibold">
                Pay Now
            </button>
            </StripeCheckout>
        </div>
    );
};

export default Pay;