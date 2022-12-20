import React, { Fragment, useEffect, useState } from "react";
import "./Page3.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  addOrderNote,
  clearErrors,
  deleteOrderNote,
  getOrderDetails,
  orderActive,
  orderCancel,
  updateOrder,
} from "../../redux/actions/orderAction";
import { toast } from "react-toastify";
import DateFormatter from "../../utils/DateFormatter";
import {
  closeTicket,
  getOrderTickets,
  openTicket,
  replyTicket,
} from "../../redux/actions/ticketsAction";
import {
  ACTIVE_ORDER_NOTE_RESET,
  ADD_ORDER_NOTE_RESET,
  CANCEL_ORDER_NOTE_RESET,
  DELETE_ORDER_NOTE_RESET,
  UPDATE_ORDER_RESET,
} from "../../constants/orderConstants";
import {
  CLOSE_TICKET_RESET,
  OPEN_TICKET_RESET,
  REPLAY_TICKET_RESET,
} from "../../constants/tiketsConstants";
import Loader from "../../Components/SideBar/Loader/Loader";

const AllOrdersPage3 = ({ toggle, setRestrictSide }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [reply, setReply] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [open, setOpen] = useState(false);

  const { error, loading, order } = useSelector((state) => state.orderDetails);
  const {
    error: addNoteError,
    loading: addNoteLoading,
    success,
    message: addNoteMessage,
  } = useSelector((state) => state.addNote);
  const {
    error: deleteNoteError,
    loading: deleteNoteLoading,
    isDeleted,
    message: deleteNoteMessage,
  } = useSelector((state) => state.deleteorderNote);
  const {
    error: actionError,
    loading: actionLoading,
    success: actionSuccess,
    isOpen,
    isClosed,
  } = useSelector((state) => state.ticketActions);
  const {
    error: orderError,
    loading: orderLoading,
    isCancelled,
    message: orderMessage,
    isActived,
  } = useSelector((state) => state.order);

  const { error: ticketsError, tickets } = useSelector(
    (state) => state.ordersTicket
  );
  const {
    error: updateError,
    isUpdated,
    message,
  } = useSelector((state) => state.order);

  useEffect(() => {
    setRestrictSide(false);
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (ticketsError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (addNoteError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (orderError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (deleteNoteError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success(message);
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    if (success) {
      toast.success(addNoteMessage);
      dispatch({ type: ADD_ORDER_NOTE_RESET });
    }
    if (isDeleted) {
      toast.success(deleteNoteMessage);
      dispatch({ type: DELETE_ORDER_NOTE_RESET });
    }
    if (actionSuccess) {
      toast.success("Reply Added...");
      dispatch({ type: REPLAY_TICKET_RESET });
    }
    if (isOpen) {
      toast.success("Opened...");
      dispatch({ type: OPEN_TICKET_RESET });
    }
    if (isClosed) {
      dispatch({ type: CLOSE_TICKET_RESET });
    }
    if (isCancelled) {
      toast.success(orderMessage);
      dispatch({ type: CANCEL_ORDER_NOTE_RESET });
    }
    if (isActived) {
      toast.success(orderMessage);
      dispatch({ type: ACTIVE_ORDER_NOTE_RESET });
    }

    dispatch(getOrderDetails(id));
    dispatch(getOrderTickets(id));
  }, [
    id,
    dispatch,
    isActived,
    isCancelled,
    orderMessage,
    orderError,
    error,
    ticketsError,
    isUpdated,
    actionSuccess,
    isClosed,
    updateError,
    isOpen,
    message,
    addNoteError,
    addNoteMessage,
    success,
    deleteNoteError,
    isDeleted,
    deleteNoteMessage,
  ]);

  const ticketCloseHandler = async (id) => {
    setOpen(true);
    if (id) {
      await localStorage.setItem("UTicketID", JSON.stringify(id));
    }
  };

  const OrderSatusHandler = (id, status) => {
    dispatch(updateOrder(id, status));
  };

  const ticketSubmitHandler = async (e) => {
    const ticketID = await JSON.parse(localStorage.getItem("UTicketID"));
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("reply", reply);
    dispatch(replyTicket(ticketID, myForm));
    dispatch(closeTicket(ticketID));
  };

  const ticketOpenHandler = (id) => {
    dispatch(closeTicket(id));
  };

  const noteSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("note", note);
    dispatch(addOrderNote(myForm, order._id));
  };

  const deleteNoteHandler = () => {
    dispatch(deleteOrderNote(order._id));
  };

  const orderCancelHandler = (OrderId) => {
    dispatch(orderCancel(OrderId));
  };
  const orderActiveHandler = (OrderId) => {
    dispatch(orderActive(OrderId));
  };
  // console.log(order.createdAt)

  return (
    <Fragment>
      {loading ||
      addNoteLoading ||
      deleteNoteLoading ||
      actionLoading ||
      orderLoading ? (
        <Fragment>
          <Loader />
        </Fragment>
      ) : (
        <div className="p3-body">
          <div className="mainsection">
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

                  <NavLink className="fw-bold navbar-brand " to="/">
                    All Orders
                  </NavLink>
                  <button
                    className="btn btn-outline-success btnround"
                    type="submit"
                  ></button>
                </div>
                <hr />
              </nav>
              <div
                className="d-flex flex-wrap justify-content-around Page3Wrapper"
                style={{ padding: "3rem" }}
              >
                <div className="page3Container" style={{ width: "60%" }}>
                  <div
                    className="p3-order-block"
                    style={{
                      width: "100%",
                      borderRadius: ".5rem",
                      border: "none",
                      backgroundColor: "white",
                      boxShadow: "3px 3px 5px #546b910f",
                      overflowX: "auto",
                      padding: " 1.8rem",
                    }}
                  >
                    <div
                      className="text-wrap"
                      style={{
                        fontWeight: "500",
                        fontSize: "1.3rem",
                        marginBottom: ".5rem",
                      }}
                    >
                      Order ID #{order && order._id}
                    </div>
                    <div className="d-flex justify-content-between">
                      <p
                        className="text-muted fs-6"
                        style={{
                          opacity: ".7",
                          fontWeight: "500",
                          marginBottom: "1.5rem",
                        }}
                      >
                        <DateFormatter date={order?.createdAt} />
                        {/* {console.log(order.createdAt.slice(11,16))} */}
                      </p>
                      {/* <h6>{order.createdAt.slice(11,16)}</h6> */}
                      {/* <div>
                        <input
                          className="form-check-input s2-radio"
                          type="radio"
                          name="radioNoLabel"
                          id="radioNoLabel1"
                          value="Pending"
                          aria-label="..."
                          style={{
                            marginBottom: "1.5rem",
                            backgroundColor:
                              order?.orderStatus === "Shipped"
                                ? "lightgreen"
                                : order?.orderStatus === "Cancelled"
                                ? "red"
                                : order?.orderStatus === "Delivered"
                                ? "green"
                                : "orange",
                          }}
                        />{" "}
                        {order?.orderStatus}
                      </div> */}

                      <div className="d-flex align-items-center">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "100%",
                            marginBottom: "1.5rem",
                            backgroundColor:
                              order?.orderStatus === "Shipped"
                                ? "#dcf6dc"
                                : order?.orderStatus === "Cancelled"
                                ? "#fae2e2"
                                : order?.orderStatus === "Delivered"
                                ? "#eff5f1"
                                : "#ffe5d4",
                          }}
                        >
                          <div
                            style={{
                              width: "7px",
                              height: "7px",
                              borderRadius: "100%",
                              backgroundColor:
                                order?.orderStatus === "Shipped"
                                  ? "lightgreen"
                                  : order?.orderStatus === "Cancelled"
                                  ? "#d60909"
                                  : order?.orderStatus === "Delivered"
                                  ? "#137e62"
                                  : "#ffa23f",
                            }}
                          ></div>
                        </div>
                        <div
                          style={{
                            marginBottom: "1.5rem",
                            marginLeft: ".3rem",
                          }}
                        >
                          {order?.orderStatus}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "1.2rem 1.8rem",
                        backgroundColor: "#f4f4f4",
                        borderRadius: ".5rem",
                        border: "none",
                      }}
                    >
                      <p
                        className="text-success m-0"
                        style={{ fontSize: ".7rem", fontWeight: "400" }}
                      >
                        DELIVERING NURSERY
                      </p>
                      <p className="my-1" style={{ fontSize: "1rem" }}>
                        {order?.deliveredBy
                          ? order?.deliveredBy
                          : "Name of the nursery"}
                      </p>
                      <p
                        className="m-0"
                        style={{
                          opacity: ".7",
                          fontWeight: "400",
                          fontSize: ".9rem",
                        }}
                      >
                        Complete Address goes here with area, pincode
                      </p>
                    </div>
                    <hr className="mt-4" />
                    {order &&
                      order?.orderItems &&
                      order?.orderItems.map((item, index) => (
                        <Fragment>
                          <p className="mt-3">{index + 1} ITEM</p>
                          <div className="d-flex flex-wrap">
                            <div
                              className="p3-order-item-block me-5"
                              style={{
                                borderRadius: ".5rem",
                                overflow: "hidden",
                                border: "none",
                              }}
                            >
                              <img
                                src={item.image}
                                alt="IMG"
                                className="w-100 h-100"
                              />
                            </div>
                            <div>
                              <p
                                style={{
                                  fontSize: ".9rem",
                                  fontWeight: "600",
                                  color: "#000",
                                }}
                              >
                                {item.name}
                              </p>
                              <p
                                style={{
                                  fontSize: "1rem",
                                  fontWeight: "500",
                                }}
                              >
                                per piece
                              </p>
                              <div
                                className="d-flex align-items-center justify-content-between"
                                style={{ width: "10rem" }}
                              >
                                <button
                                  className="btn"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "35px",
                                    height: "35px",
                                    backgroundColor: "#e1e9e6",
                                    border: "1px solid #226444",
                                  }}
                                >
                                  <p style={{ color: "#226444", margin: "0" }}>
                                    {item.quantity}
                                  </p>
                                </button>
                                <p style={{ opacity: ".9", margin: "0" }}>
                                  x {item?.price} =
                                </p>
                                <p style={{ opacity: ".9", margin: "0" }}>
                                  {item.quantity * item?.price}/-
                                </p>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      ))}
                    <hr style={{ marginTop: "0" }} />
                    <div className="d-flex justify-content-between">
                      <p
                        style={{
                          fontSize: ".7rem",
                          fontWeight: "500",
                        }}
                        className="m-0 text-muted"
                      >
                        Item Total
                      </p>
                      <p className="m-0 text-muted">{order?.itemPrice}/-</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p
                        style={{
                          fontSize: ".7rem",
                          fontWeight: "500",
                        }}
                        className="my-1 text-muted"
                      >
                        Delivery
                      </p>
                      <p className="my-1" style={{ color: "#0bab40" }}>
                        {order?.shippingPrice === 0
                          ? "FREE"
                          : order?.shippingPrice}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <p
                        style={{
                          fontSize: ".8rem",
                          fontWeight: "700",
                        }}
                        className="m-0"
                      >
                        GRAND TOTAL
                      </p>
                      <p className="m-0">{order?.totalPrice}/-</p>
                    </div>
                  </div>
                  <div
                    className="p3-order-block"
                    style={{
                      width: "100%",
                      borderRadius: ".5rem",
                      border: "none",
                      backgroundColor: "white",
                      boxShadow: "3px 3px 5px #546b910f",
                      overflowX: "auto",
                      padding: "1.8rem",
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <h6
                        style={{
                          fontWeight: "500",
                          fontSize: "1.3rem",
                        }}
                      >
                        Customer Details
                      </h6>
                      <NavLink className="text-decoration-none" to="/">
                        Edit
                      </NavLink>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between my-2">
                      <div>
                        <label
                          className="text-muted"
                          style={{
                            fontWeight: "100",
                            fontSize: ".8rem",
                            marginTop: "1rem",
                          }}
                        >
                          Name
                        </label>
                        <br />
                        <input
                          style={{
                            fontWeight: "500",
                            fontSize: ".9rem",
                          }}
                          type="text"
                          placeholder="Full Name"
                          value={order?.user?.name ? order?.user?.name : "Name"}
                          readOnly
                        />
                      </div>
                      <div>
                        <label
                          className="text-muted"
                          style={{
                            fontWeight: "100",
                            fontSize: ".8rem",
                            marginTop: "1rem",
                          }}
                        >
                          Number
                        </label>{" "}
                        <br />
                        <input
                          style={{
                            fontWeight: "500",
                            fontSize: ".9rem",
                          }}
                          type="text"
                          placeholder="Phone Number"
                          value={
                            order?.user?.phone
                              ? order?.user?.phone
                              : "Phone Number"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="my-2">
                      <label
                        className="text-muted"
                        style={{
                          fontWeight: "100",
                          fontSize: ".8rem",
                          marginTop: "1rem",
                        }}
                      >
                        Email Id
                      </label>{" "}
                      <br />
                      <input
                        style={{
                          fontWeight: "500",
                          fontSize: ".9rem",
                        }}
                        type="text"
                        placeholder="Email address"
                        value={
                          order?.user?.email?.slice(0, 17) ===
                          "example@gmail.com"
                            ? "Email"
                            : order?.user?.email
                        }
                        readOnly
                      />
                    </div>
                    <div className="my-2">
                      <label
                        className="text-muted"
                        style={{
                          fontWeight: "100",
                          fontSize: ".8rem",
                          marginTop: "1rem",
                        }}
                      >
                        Address
                      </label>{" "}
                      <br />
                      <input
                        style={{
                          fontWeight: "500",
                          fontSize: ".9rem",
                        }}
                        type="text"
                        placeholder="Address"
                        value={
                          order?.user?.shippingInfo?.address
                            ? order?.user?.shippingInfo?.address
                            : "Address"
                        }
                        readOnly
                      />
                    </div>
                    <div className="d-flex justify-content-between my-2">
                      <div>
                        <label
                          className="text-muted"
                          style={{
                            fontWeight: "100",
                            fontSize: ".8rem",
                            marginTop: "1rem",
                          }}
                        >
                          Area/Locality
                        </label>{" "}
                        <br />
                        <input
                          style={{
                            fontWeight: "500",
                            fontSize: ".9rem",
                          }}
                          type="text"
                          placeholder="Area/Locality"
                          value={
                            order?.user?.shippingInfo?.area
                              ? order?.user?.shippingInfo?.area
                              : "Area/Locality"
                          }
                          readOnly
                        />
                      </div>
                      <div>
                        <label
                          className="text-muted"
                          style={{
                            fontWeight: "100",
                            fontSize: ".8rem",
                            marginTop: "1rem",
                          }}
                        >
                          Landmark
                        </label>{" "}
                        <br />
                        <input
                          style={{
                            fontWeight: "500",
                            fontSize: ".9rem",
                          }}
                          type="text"
                          placeholder="Landmark"
                          value={
                            order?.user?.shippingInfo?.landMark
                              ? order?.user?.shippingInfo?.landMark
                              : "Landmark"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between my-2">
                      <div>
                        <label
                          className="text-muted"
                          style={{
                            fontWeight: "100",
                            fontSize: ".8rem",
                            marginTop: "1rem",
                          }}
                        >
                          City
                        </label>{" "}
                        <br />
                        <input
                          style={{
                            fontWeight: "500",
                            fontSize: ".9rem",
                          }}
                          type="text"
                          placeholder="City"
                          value={
                            order?.user?.shippingInfo?.city
                              ? order?.user?.shippingInfo?.city
                              : "City"
                          }
                          readOnly
                        />
                      </div>
                      <div>
                        <label
                          className="text-muted"
                          style={{
                            fontWeight: "100",
                            fontSize: ".8rem",
                            marginTop: "1rem",
                          }}
                        >
                          Pincode
                        </label>{" "}
                        <br />
                        <input
                          style={{
                            fontWeight: "500",
                            fontSize: ".9rem",
                          }}
                          type="text"
                          placeholder="Pincode  "
                          value={
                            order?.user?.shippingInfo?.pincode
                              ? order?.user?.shippingInfo?.pincode
                              : "Pincode"
                          }
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between my-2">
                      <div>
                        <label
                          className="text-muted"
                          style={{
                            fontWeight: "100",
                            fontSize: ".8rem",
                            marginTop: "1rem",
                          }}
                        >
                          State
                        </label>{" "}
                        <br />
                        <input
                          style={{
                            fontWeight: "500",
                            fontSize: ".9rem",
                          }}
                          type="text"
                          placeholder="State"
                          value={
                            order?.user?.shippingInfo?.state
                              ? order?.user?.shippingInfo?.state
                              : "State"
                          }
                          readOnly
                        />
                      </div>
                      <div className="position-relative">
                        <label
                          className="text-muted"
                          style={{
                            fontWeight: "100",
                            fontSize: ".8rem",
                            marginTop: "1rem",
                          }}
                        >
                          Payment Method
                        </label>{" "}
                        <br />
                        <input
                          style={{
                            fontWeight: "500",
                            fontSize: ".9rem",
                          }}
                          type="text"
                          placeholder="Cash on delivery"
                          value={
                            order?.paymentInfo?.method
                              ? order?.paymentInfo?.method
                              : "Payment Method"
                          }
                          readOnly
                        />
                        <button
                          className="btn position-absolute end-0"
                          style={
                            order.paymentInfo?.method === "online"
                              ? {
                                  top: "65%",
                                  backgroundColor: "#eff5f1",
                                  color: "#137e62",
                                  borderRadius: ".2rem",
                                  padding: "0 1rem",
                                }
                              : {
                                  top: "65%",
                                  backgroundColor: "#ffe5d4",
                                  color: "#ff6a02",
                                  borderRadius: ".2rem",
                                  fontSize: ".7rem",
                                  padding: "0 0.5rem",
                                }
                          }
                        >
                          {order?.paymentInfo?.method === "online"
                            ? "online Payment"
                            : "COD"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="page3Container2">
                  <div
                    className="p3-notes"
                    style={{
                      borderRadius: ".5rem",
                      backgroundColor: "white",
                      boxShadow: "3px 3px 5px #546b910f",
                      border: "none",
                      padding: "1.8rem 1.8rem 0 1.8rem",
                    }}
                  >
                    <p
                      className="text-muted"
                      style={{
                        fontWeight: "500",
                        fontSize: "1.3rem",
                      }}
                    >
                      NOTES
                    </p>
                    {order?.note?.message ? (
                      <Fragment>
                        <p className="w-100">
                          {order?.note?.message}{" "}
                          <span>
                            {" "}
                            <button
                              className="w-25"
                              onClick={deleteNoteHandler}
                            >
                              Delete
                            </button>
                          </span>
                        </p>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <form
                          action=""
                          className="d-flex flex-column align-items-end"
                          onSubmit={noteSubmitHandler}
                        >
                          <textarea
                            style={{
                              backgroundColor: "#f4f4f4",
                              border: "none",
                              outline: "none",
                            }}
                            className="form-control"
                            type="text"
                            placeholder="Add your Note"
                            onChange={(e) => setNote(e.target.value)}
                          />
                          <button
                            type="submit"
                            className="btn btn-outline-secondary w-25 mx-1"
                          >
                            Send
                          </button>
                        </form>
                      </Fragment>
                    )}
                  </div>
                  <div
                    className="p3-activity-bg"
                    style={{
                      borderRadius: ".5rem",
                      backgroundColor: "white",
                      boxShadow: "3px 3px 5px #546b910f",
                      border: "none",
                      padding: "1.8rem",
                    }}
                  >
                    <p
                      className="text-muted"
                      style={{
                        fontWeight: "500",
                        fontSize: "1.3rem",
                      }}
                    >
                      ACTIVITY
                    </p>

                    <div className="d-flex align-items-center">
                      <div className="lilCircle">
                        <div
                          style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: "#f4f4f4",
                            borderRadius: "100%",
                          }}
                        ></div>
                      </div>

                      <div className="p-0">
                        <h6 className="mb-2">Order Placed</h6>
                        <p
                          className="m-0 text-muted"
                          style={{ fontSize: ".7rem" }}
                        >
                          <DateFormatter date={order?.createdAt} />{" "}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mt-5">
                      <div className="lilCircle">
                        <div
                          style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: "#f4f4f4",
                            borderRadius: "100%",
                          }}
                        ></div>
                      </div>

                      <div className="p-0">
                        <h6 className="mb-2">Assigned to</h6>
                        <p
                          className="m-0 text-muted"
                          style={{ fontSize: ".7rem" }}
                        >
                          {order?.shippedAt ? (
                            <Fragment>
                              <DateFormatter date={order?.shippedAt} />
                            </Fragment>
                          ) : (
                            <Fragment>
                              <p
                                className="m-0 text-muted"
                                style={{ fontSize: ".7rem" }}
                              >
                                Not Accepted
                              </p>
                            </Fragment>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mt-5">
                      <div className="lilCircle">
                        <div
                          style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: "#f4f4f4",
                            borderRadius: "100%",
                          }}
                        ></div>
                      </div>

                      <div className="p-0">
                        <h6 className="mb-2">Order Shipped</h6>
                        <p
                          className="m-0 text-muted"
                          style={{ fontSize: ".7rem" }}
                        >
                          {order?.shippedAt ? (
                            <Fragment>
                              <DateFormatter date={order?.shippedAt} />
                            </Fragment>
                          ) : (
                            <Fragment>
                              <p
                                className="m-0 text-muted"
                                style={{ fontSize: ".7rem" }}
                              >
                                Not Shipped
                              </p>
                            </Fragment>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mt-5">
                      <div className="lilCircle">
                        <div
                          style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: "#f4f4f4",
                            borderRadius: "100%",
                          }}
                        ></div>
                      </div>

                      <div className="p-0">
                        <h6 className="mb-2">Order Delivered</h6>
                        <p
                          className="m-0 text-muted"
                          style={{ fontSize: ".7rem" }}
                        >
                          {order?.deliverdAt ? (
                            <Fragment>
                              <DateFormatter date={order?.deliverdAt} />
                            </Fragment>
                          ) : (
                            <Fragment>
                              <p
                                className="m-0 text-muted"
                                style={{ fontSize: ".7rem" }}
                              >
                                Not Delevered
                              </p>
                            </Fragment>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  {tickets &&
                    tickets.map((ticket, index) => (
                      <div className="p3-notes">
                        <h5> CUSTOMER HELP</h5>
                        <div className="p3-notes-bg">
                          <h6>{ticket?.ticket}</h6>

                          <hr className="p3-customer-hr-dotted" />
                          <h6>{ticket?.reply}</h6>
                          <br />
                          <h6 className="h6 text-right">
                            {/* - Raised at 05:00 PM, 23rd Aug 2022 */}
                            <DateFormatter date={ticket.createdAt} />
                          </h6>
                        </div>
                        {ticket?.ticketClossed?.status === true ? (
                          <Fragment>
                            <h4>
                              Closed On{" "}
                              <DateFormatter
                                date={ticket?.ticketClossed?.date}
                              />
                            </h4>
                          </Fragment>
                        ) : (
                          <Fragment>
                            {ticket?.isOpend?.status === true ? (
                              <Fragment>
                                {open === true ? (
                                  <Fragment>
                                    <form
                                      action=""
                                      onSubmit={ticketSubmitHandler}
                                    >
                                      <textarea
                                        className="form-control"
                                        type="text"
                                        placeholder="Add Reply"
                                        onChange={(e) =>
                                          setReply(e.target.value)
                                        }
                                      />
                                      <button
                                        type="submit"
                                        className="btn btn-outline-secondary w-25 mx-1"
                                      >
                                        Send
                                      </button>
                                    </form>
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    <button
                                      className="btn bg-info w-50 "
                                      onClick={() =>
                                        ticketCloseHandler(ticket._id)
                                      }
                                    >
                                      close ticket
                                    </button>
                                  </Fragment>
                                )}
                              </Fragment>
                            ) : (
                              <Fragment>
                                <button
                                  className="btn bg-info w-50 "
                                  type="button"
                                  onClick={() => ticketOpenHandler(ticket._id)}
                                >
                                  Open ticket
                                </button>
                              </Fragment>
                            )}
                          </Fragment>
                        )}
                      </div>
                    ))}
                  {/* <div className="p3-notes">
                <h5> CUSTOMER HELP</h5>
                <div className="p3-notes-bg">
                  <p6>I did not recieve my order</p6>
                  <hr className="p3-customer-hr-dotted" />
                  <p6 className="h6 text-right">
                    - Raised at 05:00 PM, 23rd Aug 2022
                  </p6>
                </div>
                <button className="btn  bg-info">close ticket</button>
              </div> */}
                </div>
              </div>
              <footer
                // className="navbar navbar-expand-lg p-2 m-5 text-right "
                className="navbar navbar-expand-lg footerPage3"
                style={{ backgroundColor: "white" }}
              >
                <div className="container-fluid px-5 d-flex align-items-center justify-content-end">
                  {order && order.orderStatus === "Delivered" ? (
                    <h4>
                      <DateFormatter date={order && order?.deliverdAt} /> -
                      Order Delivered{" "}
                    </h4>
                  ) : (
                    <Fragment>
                      {order && order?.orderStatus === "Cancelled" ? (
                        ""
                      ) : (
                        <Fragment>
                          {order && order?.orderStatus === "Shipped" ? (
                            <button
                              className="btn btn-md px-4"
                              style={{
                                backgroundColor: "#ff6700",
                                color: "#fff",
                              }}
                              type="submit"
                              onClick={() =>
                                OrderSatusHandler(order && order._id, {
                                  status: "Delivered",
                                })
                              }
                            >
                              Delivered
                            </button>
                          ) : (
                            <button
                              className="btn btn-md px-4 mx-2"
                              style={{
                                backgroundColor: "#ff6700",
                                color: "#fff",
                              }}
                              type="submit"
                              onClick={() =>
                                OrderSatusHandler(order && order._id, {
                                  status: "Shipped",
                                })
                              }
                            >
                              Ship Order
                            </button>
                          )}
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                  {order?.shippedAt ? (
                    ""
                  ) : (
                    <Fragment>
                      {order?.orderStatus === "Cancelled" ? (
                        <Fragment>
                          <button
                            className="btn btn-md px-4 mx-2"
                            style={{
                              backgroundColor: "#ff6700",
                              color: "#fff",
                            }}
                            onClick={() => orderActiveHandler(order._id)}
                          >
                            Active Order
                          </button>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <button
                            className="btn btn-outline bg-danger text-white"
                            onClick={() => orderCancelHandler(order._id)}
                          >
                            Cancel Order
                          </button>
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AllOrdersPage3;
