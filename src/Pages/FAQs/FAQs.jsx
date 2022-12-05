import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addNewFAQ, clearErrors } from "../../redux/actions/productAction";
import { ADD_FAQ_RESET } from "../../constants/productConstants";

const FAQs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [productId, setProductId] = useState("");

  const { error, success, message } = useSelector((state) => state.newFAQ);

  useEffect(() => {
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
    <div
      className="conatiner-sm d-flex justify-content-center flex-column align-items-center w-100 bg-light"
      style={{ height: "100vh" }}
    >
      <div className="bg-white rounded px-5 mt-5 py-2">
        <h2 className="">Add New Coupon</h2>
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
          <button type="submit" className="btn btn-success w-100 mt-3 mb-5">
            Add FAQ
          </button>
        </form>
      </div>
    </div>
  );
};

export default FAQs;
