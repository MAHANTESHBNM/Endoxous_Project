import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NEW_CATEGORY_RESET } from "../../constants/categoryConstants";
import {
  clearErrors,
  craeteCategory,
} from "../../redux/actions/categoryAction";

const AddCategory = ({ toggle, setRestrictSide }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, message } = useSelector(
    (state) => state.newCategory
  );

  const [name, setName] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  console.log(name, "===== Name", avatar);
  useEffect(() => {
    setRestrictSide(false);
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(message);
      navigate("/catagories");
      dispatch({ type: NEW_CATEGORY_RESET });
    }
  }, [dispatch, error, success, message, navigate]);

  const categoryDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("avatar", avatar);
    myForm.set("name", name);
    dispatch(craeteCategory(myForm));
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
            Add Category
          </NavLink>
          <button
            className="btn btn-outline-success btnround"
            type="submit"
          ></button>
        </div>
        <hr />
      </nav>
      <div
        className="conatiner-sm d-flex justify-content-center flex-column align-items-center w-100 px-4"
        style={{ minHeight: "100vh" }}
      >
        <h3 className="mb-3 mt-4">Add New Category</h3>
        <form
          className="mb-4"
          action=""
          encType="multipart/form-data"
          onSubmit={createCategorySubmitHandler}
        >
          <div
            className="mb-2 bg-white p-4 rounded mt-3"
            style={{
              borderRadius: ".5rem",
              backgroundColor: "white",
              boxShadow: "3px 3px 5px #546b910f",
              border: "none",
            }}
          >
            <label htmlFor="exampleInputNumber" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputNumber"
              aria-describedby="numberHelp"
              onChange={(e) => setName(e.target.value)}
              // value={phone}
            />
          </div>
          <div
            className="mb-2 bg-white p-4 rounded mt-3"
            style={{
              borderRadius: ".5rem",
              backgroundColor: "white",
              boxShadow: "3px 3px 5px #546b910f",
              border: "none",
            }}
          >
            <label htmlFor="exampleInputNumber" className="form-label">
              Select Image
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleInputNumber1"
              aria-describedby="numberHelp"
              name="avatar"
              accept="image/*"
              onChange={categoryDataChange}
            />
            <img
              src={avatarPreview}
              alt=""
              height="200px"
              width="160px"
              className="mt-2 "
            />
          </div>
          <button type="submit" className="btn w-100 mt-3 addNewNursery">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
