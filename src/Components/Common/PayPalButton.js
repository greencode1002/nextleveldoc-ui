import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, handleSuccessPayment }) => {

    const [paid, setPaid] = useState(false);
    const [error, setError] = useState(null);

    return (
        <PayPalScriptProvider options={{
            "client-id": "ARMH1ucHVJBWiDtzE7Czdc8MZ8NCsXyPtxkPfRqBvWU7rnDUSLrEhoMMGZB_8QgAcbtJFQIY2xmcfQ3v",
            currency: 'USD',
            intent: 'capture'
        }}>
            {!paid ? (
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "USD",
                                        value: amount, // Set your amount here
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        try {
                            const order = await actions.order?.capture();
                            console.log("Order successful:", order);
                            handleSuccessPayment(order)
                            setPaid(true);
                        } catch (err) {
                            console.error("Payment capture error:", err);
                            setError("Payment failed. Please try again.");
                        }
                    }}
                    onError={(err) => {
                        console.error("PayPal error:", err);
                        setError("An error occurred with PayPal.");
                    }}

                />
            ) : (
                <h3>Payment Successful! 🎉</h3>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </PayPalScriptProvider>
    );
};

export default PayPalButton;