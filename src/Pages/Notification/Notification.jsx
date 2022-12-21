import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  sendNotification,
  clearErrors,
} from "../../redux/actions/notificationAction";
import { ADD_NOTIFICATION_RESET } from "../../constants/notificationConstants";

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { error, success, message } = useSelector(
    (state) => state.sendNotification
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(message);
      dispatch({ type: ADD_NOTIFICATION_RESET });
      navigate(`/dashboard`);
    }
  }, [dispatch, error, message, success, navigate]);

  const sendNotificationSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("title", title.toUpperCase());
    myForm.set("text", text);

    dispatch(sendNotification(myForm));
  };

  console.log(title, "===== title");
  console.log(text, "===== text");

  return (
    <div
      className="conatiner-sm d-flex justify-content-center flex-column align-items-center w-100 bg-light"
      style={{ height: "100vh" }}
    >
      <div
        className="bg-white rounded px-5 mt-3 py-2"
        style={{
          boxShadow: "3px 3px 5px #546b910f",
        }}
      >
        <h3 className="">Push new notification</h3>
        <form
          action=""
          encType="multipart/form-data"
          className="mt-4"
          onSubmit={sendNotificationSubmitHandler}
        >
          <div className="mb-2 ">
            <label htmlFor="exampleInputNumber" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputNumber"
              aria-describedby="numberHelp"
              placeholder="add title..."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="exampleInputNumber" className="form-label">
              Message
            </label>
            <textarea
              type="text"
              className="form-control"
              id="exampleInputNumber"
              aria-describedby="numberHelp"
              placeholder="add message..."
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button type="submit" className="addNewNursery btn w-100 mt-3 mb-5">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Notification;
