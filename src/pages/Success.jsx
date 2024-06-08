import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/action";
import { createOrder } from "../services/orderService";
import { toast, ToastContainer } from "react-toastify";
import { Navbar, Footer } from "../components"; // Importa tus componentes de Navbar y Footer

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderCreated, setOrderCreated] = useState(false);

  useEffect(() => {
    const finalizeOrder = async () => {
      if (orderCreated) {
        console.log("Order already created, skipping...");
        return;
      }

      // Recupera el carrito desde localStorage
      const savedCart = localStorage.getItem('cart');
      if (!savedCart) {
        console.log("Cart is empty, skipping order creation");
        return;
      }
      const cartItems = JSON.parse(savedCart);

      // Recupera el token desde localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found, skipping order creation");
        return;
      }

      try {
        const orderData = {
          products: cartItems.map((item) => ({
            id: item.id,
            title: item.title,
            quantity: item.qty,
            price: item.price,
          })),
          totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
        };

        console.log("Creating order with data:", orderData);

        await createOrder(orderData, token);
        console.log("Order created successfully");
        setOrderCreated(true);
        dispatch(clearCart());
        toast.success("Order placed successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        toast.error("There was an error placing your order. Please try again.");
        console.error("Error creating order:", error);
      }
    };

    finalizeOrder();
  }, [dispatch, navigate, orderCreated]);

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Payment Successful!</h1>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Success;

