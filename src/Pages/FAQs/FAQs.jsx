import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addNewFAQ, clearErrors } from "../../redux/actions/productAction";
import { ADD_FAQ_RESET } from "../../constants/productConstants";

const FAQs = ({ toggle, setRestrictSide }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [productId, setProductId] = useState("");

  const { error, success, message } = useSelector((state) => state.newFAQ);

  useEffect(() => {
    setRestrictSide(false);
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(message);
      dispatch({ type: ADD_FAQ_RESET });
      navigate(`/products`);
    }
  }, [dispatch, error, message, success, navigate]);

  const createCouponSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("question", question);
    myForm.set("answer", answer);

    dispatch(addNewFAQ(productId, myForm));
  };

  return (
    <div className="section2">
      <nav
        className="s2-navabar navbar navbar-expand-lg"
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

          <NavLink className="fw-bold navbar-brand" to="">
            Add FAQs
          </NavLink>
          <button
            className="btn btn-outline-success btnround"
            type="submit"
          ></button>
        </div>
        <hr />
      </nav>
      <div
        className="conatiner-sm d-flex justify-content-center flex-column align-items-center w-100 bg-light"
        style={{ height: "100vh" }}
      >
        <div
          className="bg-white rounded px-5 pt-5 py-2"
          style={{
            borderRadius: ".5rem",
            backgroundColor: "white",
            boxShadow: "3px 3px 5px #546b910f",
            border: "none",
          }}
        >
          <h2 className="fs-4 text-center">Add New FAQ</h2>
          <form
            action=""
            encType="multipart/form-data"
            className="mt-4"
            onSubmit={createCouponSubmitHandler}
          >
            <div className="mb-2 ">
              <label htmlFor="exampleInputNumber" className="form-label">
                Product ID
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputNumber"
                aria-describedby="numberHelp"
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="exampleInputNumber" className="form-label">
                Question
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputNumber"
                aria-describedby="numberHelp"
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="exampleInputNumber" className="form-label">
                Answer
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputNumber"
                aria-describedby="numberHelp"
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <button type="submit" className="btn addNewNursery w-100 mt-3 mb-5">
              Add FAQ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
