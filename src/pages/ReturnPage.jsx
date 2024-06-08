import React, { useState } from 'react';
import { Footer, Navbar } from "../components";
// import { useNavigate } from 'react-router-dom';
import { createReturn } from '../services/returnService';

const ReturnPage = () => {
  const [orderId, setOrderId] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const returnData = { orderId, reason };
      await createReturn(returnData, token);
      setMessage("Return request successful!");
      setOrderId("");
      setReason("");
      setLoading(false);
    } catch (error) {
      setMessage("There was an error processing your return request.");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Return Request</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="orderId">Order ID:</label>
                <input
                  type="text"
                  className="form-control"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter Order ID"
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="reason">Reason for return:</label>
                <textarea
                  className="form-control"
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter Reason"
                  required
                />
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Return Request'}
                </button>
              </div>
            </form>
            {message && <div className="my-3">{message}</div>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReturnPage;
