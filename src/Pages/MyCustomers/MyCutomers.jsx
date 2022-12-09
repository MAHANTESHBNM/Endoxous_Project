import React, { useEffect, useState, Fragment } from "react";
import "./Page8.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearErrors, getAllUsers } from "../../redux/actions/userAction.js";
import { toast } from "react-toastify";
import DateFormatter from "../../utils/DateFormatter";
import Loader from "../../Components/SideBar/Loader/Loader";

const MyCustomers = ({ toggle, setRestrictSide }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const { error, loading, users } = useSelector((state) => state.allUsers);
  const usersOnly = users && users.filter((user) => user.role !== "admin");

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    setRestrictSide(false);
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(getAllUsers());
  }, [dispatch, error, keyword]);

  const customerDetailsHandler = (id) => {
    navigate(`/customer/${id}`);
  };

  const AllUsers = users && users.filter((user) => user);

  // Date
  let currentDate = new Date().toJSON().slice(0, 10);

  // Week
  const getLastWeeksDate = () => {
    const now = new Date();
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      .toJSON()
      .slice(0, 10);
  };
  const weekend = getLastWeeksDate();

  // Month
  function getMonthEndDate(numOfMonths, date = new Date()) {
    const dateCopy = new Date(date.getTime());
    dateCopy.setMonth(dateCopy.getMonth() - numOfMonths);
    return dateCopy;
  }
  const date = new Date();
  const monthend = getMonthEndDate(1, date).toJSON().slice(0, 10);

  // Filtering
  const todayUsers =
    users && users.filter((user) => user.joinedOn.slice(0, 10) === currentDate);

  const weekUsers =
    users && users.filter((user) => user.joinedOn.slice(0, 10) >= weekend);

  const monthUsers =
    users && users.filter((user) => user.joinedOn.slice(0, 10) >= monthend);

  const userSelect = (e) => {
    let item = parseInt(e.target.value);
    if (item === 1) {
      setFilteredUsers(todayUsers);
      setState(true);
    } else if (item === 2) {
      setFilteredUsers(weekUsers);
      setState(true);
    } else if (item === 3) {
      setFilteredUsers(monthUsers);
      setState(true);
    } else {
      setFilteredUsers(AllUsers);
      setState(true);
    }
  };

  return (
    <div>
      <div className="mainsection">
        <div className="section2 ">
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
                My Customer
              </NavLink>
              <button
                className="btn btn-outline-success btnround"
                type="submit"
              ></button>
            </div>
            <hr />
          </nav>
          <div className="d-flex justify-content-between align-items-center flex-wrap px-2 py-1">
            <div className="px-5 pt-4 pb-3 filterInput">
              <input
                style={{ borderRadius: ".2rem" }}
                className="form-control px-4"
                type="text"
                placeholder="Search Phone Number..."
                aria-label="readonly input example"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="px-4 filterInput">
              <div className="d-flex px-4">
                {/* <div className="p2-selection mx-2">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                  >
                    <option selected>Order status </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div> */}
                {/* <div className="p2-selection mx-2 ">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                  >
                    <option selected>Special filters</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div> */}
                <div className="p2-selection mx-2 filterInput">
                  <select
                    className="form-select "
                    aria-label="Default select example"
                    onChange={userSelect}
                  >
                    <option defaultValue="Select">All Users</option>
                    <option value="1">Today</option>
                    <option value="2">This Week</option>
                    <option value="3">This Month</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="section2-btn d-flex  px-5 ">
            <button className="s2-btn py-2 px-3 my-2">All</button>
            <button className="s2-btn py-2 px-3 my-2">Pending</button>
            <button className="s2-btn py-2 px-3 my-2">Shipped</button>
            <button className="s2-btn py-2 px-3 my-2">Delivered</button>
            <button className="s2-btn py-2 px-3 my-2">Cancelled</button>
          </div> */}
          <div className="s2-table tableForAll">
            <div className="s2-table subTableForAll">
              {loading ? (
                <Loader />
              ) : (
                <table
                  className="table table-borderless"
                  style={{
                    overflow: "hidden",
                    width: "100%",
                    borderRadius: ".5rem",
                    backgroundColor: "white",
                  }}
                >
                  <thead
                    style={{ backgroundColor: "#eaeaea", fontWeight: "500" }}
                  >
                    <tr>
                      <th scope="col">Customer ID</th>
                      <th scope="col">Date & Time</th>
                      <th scope="col">Customer</th>
                      {/* <th scope="col">Items</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Status</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Area/Locality</th> */}
                    </tr>
                  </thead>
                  <tbody className="table-group-divider my-5">
                    {state === false ? (
                      <Fragment>
                        {usersOnly &&
                          usersOnly
                            .filter((val) => {
                              if (keyword === "") {
                                return val;
                              } else if (
                                val.fullName
                                  .toLowerCase()
                                  .includes(keyword.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((user, index) => (
                              <tr>
                                <th
                                  scope="row"
                                  onClick={() =>
                                    customerDetailsHandler(user._id)
                                  }
                                  style={{
                                    cursor: "pointer",
                                    color: "#0aa350",
                                    fontWeight: "500",
                                  }}
                                >
                                  {user._id}
                                </th>
                                <td>
                                  {" "}
                                  <DateFormatter date={user?.joinedOn} />{" "}
                                </td>
                                <td>
                                  {" "}
                                  {user?.phone ? user?.phone : "not specified"}
                                </td>
                                {/* <td> 1 </td>
                          <td>COD</td> */}
                                {/* <td>
                            <div>
                              <input
                                className="form-check-input s2-radio"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel1"
                                value="Pending"
                                aria-label="..."
                              />{" "}
                              Pending
                            </div>
                          </td>
                          <td>Rs 320</td> */}
                                {/* <td>
                            <select
                              className="form-select-sm px-3"
                              aria-label="Default select example"
                            >
                              <option selected>Select Nursery </option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </td> */}
                              </tr>
                            ))}
                      </Fragment>
                    ) : (
                      <Fragment>
                        {filteredUsers &&
                          filteredUsers
                            .filter((val) => {
                              if (keyword === "") {
                                return val;
                              } else if (
                                val.fullName
                                  .toLowerCase()
                                  .includes(keyword.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((user, index) => (
                              <tr>
                                <th
                                  scope="row"
                                  onClick={() =>
                                    customerDetailsHandler(user._id)
                                  }
                                  style={{
                                    cursor: "pointer",
                                    color: "#0aa350",
                                    fontWeight: "500",
                                  }}
                                >
                                  {user._id}
                                </th>
                                <td>
                                  {" "}
                                  <DateFormatter date={user?.joinedOn} />{" "}
                                </td>
                                <td>
                                  {" "}
                                  {user?.phone ? user?.phone : "not specified"}
                                </td>
                                {/* <td> 1 </td>
                          <td>COD</td>
                          <td>
                            <div>
                              <input
                                className="form-check-input s2-radio"
                                type="radio"
                                name="radioNoLabel"
                                id="radioNoLabel1"
                                value="Pending"
                                aria-label="..."
                              />{" "}
                              Pending
                            </div>
                          </td>
                          <td>Rs 320</td>
                          <td>
                            <select
                              className="form-select-sm px-3"
                              aria-label="Default select example"
                            >
                              <option selected>Select Nursery </option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </td> */}
                              </tr>
                            ))}
                      </Fragment>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCustomers;
