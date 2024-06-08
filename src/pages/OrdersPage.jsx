import React, { useEffect, useState } from 'react';
import { getOrdersByUser } from '../services/orderService';
import { Footer, Navbar } from "../components";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const ordersData = await getOrdersByUser(token);
        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">My Orders</h1>
        <hr />
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <div key={order._id} className="col-md-4 col-sm-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Order ID: {order._id}</h5>
                    <p className="card-text">Status: {order.status}</p>
                    <p className="card-text">Total Price: ${order.totalPrice}</p>
                    <p className="card-text">Items:</p>
                    <ul>
                      {order.products.map((product, index) => (
                        <li key={index}>
                          {product.title} - {product.quantity} x ${product.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
