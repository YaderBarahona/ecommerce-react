// import React, { useState } from "react";
// import { Footer, Navbar } from "../components";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { clearCart } from "../redux/action";
// import { createOrder } from "../services/orderService"; 
// import { toast, ToastContainer } from 'react-toastify';

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const state = useSelector((state) => state.handleCart);

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const token = localStorage.getItem('token');
//   console.log(token);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true); 
//     try {
//       const orderData = {
//         products: state.map((item) => ({
//           id: item.id, 
//           title: item.title,
//           quantity: item.qty,
//           price: item.price
//         })),
//         totalPrice: state.reduce((acc, item) => acc + item.price * item.qty, 0)
//       };

//       await createOrder(orderData, token); 
//       dispatch(clearCart());
//       toast.success("Order placed successfully!");
//       setTimeout(() => {
//         navigate("/");
//       }, 2000);
//     } catch (error) {
//       toast.error("There was an error placing your order. Please try again.");
//       console.error(error);
//     } finally {
//       setIsSubmitting(false); 
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container my-3 py-3">
//         <h1 className="text-center">Checkout</h1>
//         <hr />
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <form onSubmit={handleSubmit}>
//               <button className="w-100 btn btn-primary" type="submit" disabled={isSubmitting}>
//               {isSubmitting ? "Processing..." : "Confirm Order"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//       <ToastContainer />
//     </>
//   );
// };

// export default Checkout;

import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51OihDKLM3j4JsNrym59kUU3RsBCNQrWbtvNcub9fZFqxPmvNDjjGlJYEHl6WVXtgwoetpFPIwfZg12s5LJuY3OaO00rl4pdzZX');

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const item = {
    price: "price_1PPJzILM3j4JsNryj9W0eIJy",
    quantity: 1
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Guarda el carrito en localStorage
      localStorage.setItem('cart', JSON.stringify(state));

      const stripe = await stripePromise;
      const response = await stripe.redirectToCheckout({
        // lineItems: state.map(item => ({ price: item.price_id, quantity: item.qty })),
        lineItems: [item],
        mode: 'payment',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`
      });

      if (response.error) {
        throw new Error('Error processing payment');
      }
    } catch (error) {
      toast.error("There was an error processing your payment. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <button className="w-100 btn btn-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Confirm Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Checkout;

