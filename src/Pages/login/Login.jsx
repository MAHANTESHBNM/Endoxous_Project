import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/userAction";
import { toast } from "react-toastify";
import Loader from "../../Components/SideBar/Loader/Loader";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    error,
    loading,
    message,
    success,
    isLogout,
    isLogined,
    isAuthenticated,
    user: LogetUser,
  } = useSelector((state) => state.user);
  const { isAdmin } = useSelector((state) => state.admin);

  const [phone, setPhone] = useState("");
  console.log(phone, "---- phone");

  const loginSubmit = (e) => {
    e.preventDefault();
    if (isAdmin && isAdmin === phone) {
      dispatch(login(phone));
    } else {
      toast.warning(" Access Denied!!! ");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    props.setRestrictSide(true)
    if (isAuthenticated) {
      if (success) {
        toast.success(message);
        return navigate("/verifyotp");
      } else if (
        LogetUser &&
        LogetUser.role === "admin" &&
        LogetUser.power === "Hero"
      ) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [error, dispatch, message, navigate, success, LogetUser, isAuthenticated]);

  return (
    <div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div
            className="d-flex justify-content-center flex-column align-items-center w-100"
            style={{ height: "100vh" }}
          >
            <h2 className="mb-5">Login</h2>
            <form action="" onSubmit={loginSubmit}>
              <div className="mb-2">
                <label htmlFor="exampleInputNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputNumber"
                  aria-describedby="numberHelp"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <div id="numberHelp" className="form-text">
                  We'll never share your number with anyone.
                </div>
              </div>

              <button type="submit" className="btn addNewNursery w-100 mt-3">
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
