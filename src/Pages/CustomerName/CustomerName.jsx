import React, { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getUserDetails } from "../../redux/actions/userAction";
import { toast } from "react-toastify";
import { getUsersOrders } from "../../redux/actions/orderAction";

const CustomerName = ({ toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [filteredOrders, setFilterOrders] = useState([]);
  const [state, setState] = useState(false);

  const { error, loading, user } = useSelector((state) => state.userDetails);
  const {
    error: orderError,
    loading: orderLoading,
    orders,
  } = useSelector((state) => state.usersOrders);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (orderError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    if (orders) {
      setFilterOrders(orders);
    }

    dispatch(getUserDetails(id));
    dispatch(getUsersOrders(id));
  }, [dispatch, id, error, orderError, setFilterOrders]);

  const orderDetailsHandler = (id) => {
    navigate(`/orders/${id}`);
  };

  const AllOrdders = orders && orders.filter((order) => order);
  const pendingOrdders =
    orders && orders.filter((order) => order.orderStatus === "pending");
  const shippedOrdders =
    orders && orders.filter((order) => order.orderStatus === "Shipped");
  const deliveredOrdders =
    orders && orders.filter((order) => order.orderStatus === "Delivered");
  const CancelledOrdders =
    orders && orders.filter((order) => order.orderStatus === "Cancelled");

  const showAll = () => {
    setFilterOrders(AllOrdders);
    setState(true);
  };
  const showPending = () => {
    setFilterOrders(pendingOrdders);
    setState(true);
  };
  const showShippied = () => {
    setFilterOrders(shippedOrdders);
    setState(true);
  };
  const showDelivered = () => {
    setFilterOrders(deliveredOrdders);
    setState(true);
  };
  const showCancelled = () => {
    setFilterOrders(CancelledOrdders);
    setState(true);
  };

  return (
    <div className="section2">
      <nav
        className="s2-navabar navbar navbar-expand-lg "
        style={{ backgroundColor: "white" }}
      >
        <div className="container-fluid px-5">
          <button
            onClick={() => toggle()}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <NavLink className="fw-bold navbar-brand" to="/">
            Customer Name
          </NavLink>
          <button
            className="btn btn-outline-success btnround"
            type="submit"
          ></button>
        </div>
        <hr />
      </nav>
      <div className="d-flex justify-content-between flex-wrap">
        <div
          className="d-flex flex-wrap px-4 customerNameContainer"
          style={{ width: "58%", height: "100%" }}
        >
          <div className="section2-btn d-flex flex-wrap py-3">
            <button
              className="s2-btn py-2 px-3 my-2"
              style={{ padding: ".7rem" }}
              onClick={() => showAll()}
              autoFocus
            >
              All
            </button>
            <button
              className="s2-btn py-2 px-3 my-2"
              style={{ padding: "0.7rem" }}
              onClick={() => showPending()}
            >
              Pending
            </button>
            <button
              className="s2-btn py-2 px-3 my-2"
              style={{ padding: "0.7rem" }}
              onClick={() => showShippied()}
            >
              Shipped
            </button>
            <button
              className="s2-btn py-2 px-3 my-2"
              style={{ padding: "0.7rem" }}
              onClick={() => showDelivered()}
            >
              Delivered
            </button>
            <button
              className="s2-btn py-2 px-3 my-2"
              style={{ padding: "0.7rem" }}
              onClick={() => showCancelled()}
            >
              Cancelled
            </button>
          </div>
          <div className="container d-flex flex-wrap">
            {state === false ? (
              <Fragment>
                {orders &&
                  orders.map((order, index) => (
                    <div
                      className="card m-2"
                      style={{ width: "46%" }}
                      key={index}
                    >
                      <div className="row g-0 d-flex justify-content-center">
                        <h6
                          className="card-title text-wrap text-capitalize pt-2 px-2"
                          style={{ opacity: ".9", fontSize: ".8rem" }}
                        >
                          Order no #{order?._id}
                        </h6>
                        <div
                          className="col-md-4 p-2 cardView"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            className="cardBox"
                            style={{
                              backgroundColor: "#ececec",
                              borderRadius: ".5rem",
                              width: "70px",
                              height: "70px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={order.orderItems[0]?.image}
                              className="img-fluid"
                              alt="img"
                            />
                          </div>
                        </div>

                        <div className="col-md-8 pb-2">
                          <div
                            className="card-body"
                            style={{
                              lineHeight: ".7rem",
                            }}
                          >
                            <p className="card-text">
                              <small
                                className="text-muted text-capitalize"
                                style={{
                                  opacity: ".6",
                                  fontWeight: "500",
                                }}
                              >
                                item {order?.orderItems.length}
                              </small>
                            </p>
                            <span className="card-text text-success">
                              Rs {order?.totalPrice}
                            </span>

                            <span
                              className="form-check form-switch d-inline me-2"
                              style={{
                                position: "absolute",
                                // bottom: "45%",
                                right: "0",
                              }}
                            >
                              <input
                                style={
                                  order.paymentInfo?.method === "online"
                                    ? {
                                        backgroundColor: "#eff5f1",
                                        color: "#137e62",
                                        borderRadius: ".2rem",
                                        padding: "0.4rem 0",
                                        border: "none",
                                        outline: "none",
                                      }
                                    : {
                                        backgroundColor: "#ffe5d4",
                                        color: "#ff6a02",
                                        borderRadius: ".2rem",
                                        padding: "0.4rem 0",
                                        border: "none",
                                        outline: "none",
                                      }
                                }
                                className="p-2"
                                type="button"
                                id="flexSwitchCheckDefault"
                                value={order.paymentInfo?.method}
                                readOnly
                              />
                              {/* <input
                        className="form-check-input"
                        type="button"
                        id="flexSwitchCheckDefault"
                      /> */}
                            </span>
                          </div>
                        </div>
                        <hr style={{ width: "95%", margin: ".5rem" }} />
                        <div className="d-flex px-2 pb-2 justify-content-between align-items-center">
                          <h6 className="m-0">{order?.orderStatus}</h6>
                          <button
                            type="button"
                            className="btn btn-outline-success btn-md allProductsBtn"
                            onClick={() => orderDetailsHandler(order?._id)}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </Fragment>
            ) : (
              <Fragment>
                {filteredOrders &&
                  filteredOrders.map((order, index) => (
                    <div
                      className="card m-2"
                      style={{ width: "46%" }}
                      key={index}
                    >
                      <div className="row g-0 d-flex justify-content-center">
                        <h6
                          className="card-title text-wrap text-capitalize pt-2 px-2"
                          style={{ opacity: ".9", fontSize: ".8rem" }}
                        >
                          Order no #{order?._id}
                        </h6>
                        <div
                          className="col-md-4 p-2 cardView"
                          style={{
                            display: "flex",
                            // flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            className="cardBox"
                            style={{
                              backgroundColor: "#ececec",
                              borderRadius: ".5rem",
                              width: "70px",
                              height: "70px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={order.orderItems[0]?.image}
                              className="img-fluid"
                              alt="img"
                            />
                          </div>
                        </div>

                        <div className="col-md-8 pb-2">
                          <div
                            className="card-body"
                            style={{
                              lineHeight: ".7rem",
                            }}
                          >
                            <p className="card-text">
                              <small
                                className="text-muted text-capitalize"
                                style={{
                                  opacity: ".6",
                                  fontWeight: "500",
                                }}
                              >
                                item {order?.orderItems.length}
                              </small>
                            </p>
                            <span className="card-text text-success">
                              Rs {order?.totalPrice}
                            </span>

                            <span
                              className="form-check form-switch d-inline me-2"
                              style={{ position: "absolute", right: "0" }}
                            >
                              <input
                                style={
                                  order.paymentInfo?.method === "online"
                                    ? {
                                        backgroundColor: "#eff5f1",
                                        color: "#137e62",
                                        borderRadius: ".2rem",
                                        padding: "0.4rem 0",
                                        border: "none",
                                        outline: "none",
                                      }
                                    : {
                                        backgroundColor: "#ffe5d4",
                                        color: "#ff6a02",
                                        borderRadius: ".2rem",
                                        padding: "0.4rem 0",
                                        border: "none",
                                        outline: "none",
                                      }
                                }
                                className="p-2"
                                type="button"
                                id="flexSwitchCheckDefault"
                                value={order.paymentInfo?.method}
                                readOnly
                              />
                              {/* <input
                        className="form-check-input"
                        type="button"
                        id="flexSwitchCheckDefault"
                      /> */}
                            </span>
                          </div>
                        </div>
                        <hr style={{ width: "95%", margin: ".5rem" }} />
                        <div className="d-flex px-2 pb-2 justify-content-between align-items-center">
                          <h6 className="m-0">{order?.orderStatus}</h6>
                          <button
                            type="button"
                            className="btn btn-outline-success btn-md allProductsBtn"
                            onClick={() => orderDetailsHandler(order?._id)}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </Fragment>
            )}
          </div>
        </div>
        <div
          className="container-md d-flex flex-column customerNameContainer"
          style={{ width: "38%", backgroundColor: "white", height: "100%" }}
        >
          <div
            className="d-flex align-items-center justify-content-between w-100 px-3"
            style={{ height: "4rem" }}
          >
            <h5 className="m-0">Customer Details</h5>
            <button className="btn py-0">Edit</button>
          </div>
          <hr />
          <div
            className="px-3"
            style={{ lineHeight: ".4rem", margin: ".7rem 0" }}
          >
            <p>Name</p>
            <h6>{user?.name ? user?.name : "USER NAME"}</h6>
          </div>
          <div
            className="px-3"
            style={{ lineHeight: ".4rem", margin: ".7rem 0" }}
          >
            <p>Phone</p>
            <h6>{user?.phone ?? "USER PHONE"}</h6>
          </div>
          <div
            className="px-3"
            style={{ lineHeight: ".4rem", margin: ".7rem 0" }}
          >
            <p>Email</p>
            <h6>
              {user?.email?.slice(0, 17) === "example@gmail.com"
                ? "USER EMAIL"
                : user?.email}
            </h6>
          </div>
          <div
            className="px-3"
            style={{ lineHeight: ".4rem", margin: ".7rem 0" }}
          >
            <p>Address</p>
            <h6>{user?.address ?? "USER ADDRESS"}</h6>
          </div>
          <div
            className="px-3"
            style={{ lineHeight: ".4rem", margin: ".7rem 0" }}
          >
            <p>Area/Locality</p>
            <h6>{user?.area ?? "USER AREA/LOCALITY"}</h6>
          </div>
          <div
            className="px-3"
            style={{ lineHeight: ".4rem", margin: ".7rem 0" }}
          >
            <p>State</p>
            <h6>{user?.state ?? "USER STATE"}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerName;
