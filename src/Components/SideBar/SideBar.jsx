import React from "react";
import logo from "../../Assets/Images/logo3.png";
import "./SideBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";

const SideBar = ({ show, toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/");
  }

  return (
    <div>
      {(show || !(window.innerWidth < 992)) && (
        <div style={{ zIndex: "1", paddingTop:"8rem" }} className="section1">
          <div style={{ position: "absolute", top: "1rem", left: "3rem" }}>
            <BsFillArrowLeftCircleFill
              className="hideButton"
              style={{ display: "none" }}
              onClick={() => toggle()}
            />
          </div>

          <div className="logo">
            <img className="logo" src={logo} alt="img" />
          </div>
          <div className="sideListItems">
            <ul className="navbar-nav justify-content-end flex-grow-1 ">
              <li className="nav-item">
                <NavLink to="/dashboard">
                  <button className="s1-btn btn btn-sm px-4 sideBtns">
                    Home
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/orders">
                  <button className="s1-btn btn btn-sm px-4 sideBtns">
                    Orders
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <div>
                  <div className="dropdown">
                    <button
                      className="s1-btn btn btn-sm sideBtns"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Products
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item s1-btn btn btn-sm px-4 sideBtns"
                          to="/products"
                        >
                          All Products
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item s1-btn btn btn-sm px-4 sideBtns"
                          to="/catagories"
                        >
                          Catagories
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item s1-btn btn btn-sm px-4 sideBtns"
                          to="/"
                        >
                          Inventory
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <NavLink to="/couponlist">
                  <button className="s1-btn btn btn-sm px-4 sideBtns">
                    Coupons
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/support">
                  <button className="s1-btn btn btn-sm px-4 sideBtns">
                    Support
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/customers">
                  <button className="s1-btn btn btn-sm px-4 sideBtns">
                    Customer
                  </button>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/ordersreport">
                  <button className="s1-btn btn btn-sm px-4 sideBtns">
                    Payments
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/salesreport">
                  <button className="s1-btn btn btn-sm px-4 sideBtns">
                    Sales Report
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/analystics">
                  <button className="s1-btn btn btn-sm px-4 sideBtns">
                    Analytics
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/allnurseries">
                  <button className="s1-btn btn btn-sm px-4 sideBtns">
                    Nurseries
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/faqs">
                  <button className="s1-btn btn btn-sm px-4 sideBtns">
                    FAQs
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink>
                  <button
                    className="s1-btn btn btn-sm px-4 sideBtns"
                    onClick={() => logoutUser()}
                  >
                    Logout
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
