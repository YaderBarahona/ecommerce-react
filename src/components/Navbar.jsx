import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const state = useSelector(state => state.handleCart);
    const navigate = useNavigate();

    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">React Ecommerce</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>

                        {!isAuthenticated ? (
                            <> 
                            </>
                        ) : (
                            <> 
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/orders">Orders</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/returns">Returns</NavLink>
                        </li>
                        </>
                         )}
                    </ul>
                    <div className="buttons text-center">
                        {!isAuthenticated ? (
                            <>
                                <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                            </>
                        ) : (
                            <button onClick={handleLogout} className="btn btn-outline-dark m-2"><i className="fa fa-sign-out-alt mr-1"></i> Logout</button>
                        )}
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})</NavLink>
                        {/* <NavLink to="/returns" className="btn btn-outline-dark m-2"><i className="fa fa-box mr-1"></i> Returns</NavLink> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
