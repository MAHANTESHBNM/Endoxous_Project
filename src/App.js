import { useState, useEffect } from "react";
import SideBar from "./Components/SideBar/SideBar";
import HomePage from "./Pages/HomePage/HomePage";
import AllOrders from "./Pages/AllOrders/AllOrders";
import AllOrdersPage3 from "./Pages/AllOrdersPage3/AllOrdersPage3";
import AllNurseries from "./Pages/AllNurseries/AllNurseries";
import OrdersReports from "./Pages/OrdersReports/OrderReports";
import SalesReport from "./Pages/SalesReport/SalesReport";
import MyCustomers from "./Pages/MyCustomers/MyCutomers";
import AllProducts from "./Pages/AllProducts/AllProducts";
import Categories from "./Pages/Categories/Categories";
import VerifyOTP from "./Pages/verifyOTP/VerifyOTP";
import Login from "./Pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddCategory from "./Pages/AddCategory/AddCategory";
import AddProducts from "./Pages/Products/AddProducts";
import EditProducts from "./Pages/Products/EditProducts";
import Analystics from "./Pages/Analytics/Analytics";
import CustomerSupport from "./Pages/CustomerSupport/CustomerSupport";
import CustomerName from "./Pages/CustomerName/CustomerName";
import PageNotFound from "./Components/SideBar/PageNotFound";
import Coupon from "./Pages/Coupon/Coupon";
import CouponList from "./Pages/Coupon/CouponList";
import FAQs from "./Pages/FAQs/FAQs";
import store from "./redux/store";
import AdminPrivateRoute from "./utils/protectiveRoute";
import { getAdmin, loadUser } from "./redux/actions/userAction";
import Notification from "./Pages/Notification/Notification";

function App() {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const [restrictSide, setRestrictSide] = useState(true);

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getAdmin());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {!restrictSide && <SideBar show={show} toggle={toggle} />}
        <ToastContainer position="top-center" />
        <Routes>
          <Route
            path="/"
            element={<Login setRestrictSide={setRestrictSide} />}
          />
          <Route
            path="/verifyotp"
            element={<VerifyOTP setRestrictSide={setRestrictSide} />}
          />
          <Route
            path="/coupon"
            element={
              <Coupon setRestrictSide={setRestrictSide} toggle={toggle} />
            }
          />
          <Route
            path="/couponlist"
            element={
              <CouponList setRestrictSide={setRestrictSide} toggle={toggle} />
            }
          />
          <Route
            path="*"
            element={
              <PageNotFound setRestrictSide={setRestrictSide} toggle={toggle} />
            }
          />

          {/* <Route path="/coupon" element={<Coupon />} />
          <Route path="/couponlist" element={<CouponList />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="*" element={<PageNotFound toggle={toggle} />} />
          <Route path="/products" element={<AllProducts toggle={toggle} />} />
          <Route path="/dashboard" element={<HomePage toggle={toggle} />} />
          <Route path="/orders" element={<AllOrders toggle={toggle} />} />
          <Route
            path="/orders/:id"
            element={<AllOrdersPage3 toggle={toggle} />}
          />
          <Route
            path="/allnurseries"
            element={<AllNurseries toggle={toggle} />}
          />
          <Route
            path="/ordersreport"
            element={<OrdersReports toggle={toggle} />}
          />
          <Route
            path="/salesreport"
            element={<SalesReport toggle={toggle} />}
          />
          <Route path="/catagories" element={<Categories toggle={toggle} />} />
          <Route path="/customers" element={<MyCustomers toggle={toggle} />} />
          <Route path="/customer" element={<CustomerName toggle={toggle} />} />
          <Route
            path="/category/new"
            element={<AddCategory toggle={toggle} />}
          />
          <Route
            path="/product/new"
            element={<AddProducts toggle={toggle} />}
          />
          <Route path="/analystics" element={<Analystics toggle={toggle} />} />
          <Route
            path="/support"
            element={<CustomerSupport toggle={toggle} />}
          />
          <Route
            path="/customer/:id"
            element={<CustomerName toggle={toggle} />}
          />
          <Route
            path="/product/edit/:id"
            element={<EditProducts show={show} />}
          /> */}
          <Route path="/faqs" element={<AdminPrivateRoute isAdmin={true} />}>
            <Route
              path=""
              element={
                <FAQs setRestrictSide={setRestrictSide} toggle={toggle} />
              }
            />
          </Route>

          <Route path="/orders" element={<AdminPrivateRoute isAdmin={true} />}>
            <Route
              path=""
              element={
                <AllOrders setRestrictSide={setRestrictSide} toggle={toggle} />
              }
            />
          </Route>

          <Route
            path="/products"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <AllProducts
                  setRestrictSide={setRestrictSide}
                  toggle={toggle}
                />
              }
            />
          </Route>

          <Route
            path="/dashboard"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <HomePage setRestrictSide={setRestrictSide} toggle={toggle} />
              }
            />
          </Route>

          <Route
            path="/orders/:id"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <AllOrdersPage3
                  setRestrictSide={setRestrictSide}
                  toggle={toggle}
                />
              }
            />
          </Route>

          <Route
            path="/allnurseries"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <AllNurseries
                  setRestrictSide={setRestrictSide}
                  toggle={toggle}
                />
              }
            />
          </Route>

          <Route
            path="/ordersreport"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <OrdersReports
                  setRestrictSide={setRestrictSide}
                  toggle={toggle}
                />
              }
            />
          </Route>

          <Route
            path="/salesreport"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <SalesReport
                  setRestrictSide={setRestrictSide}
                  toggle={toggle}
                />
              }
            />
          </Route>

          <Route
            path="/catagories"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <Categories setRestrictSide={setRestrictSide} toggle={toggle} />
              }
            />
          </Route>

          <Route
            path="/customers"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <MyCustomers
                  setRestrictSide={setRestrictSide}
                  toggle={toggle}
                />
              }
            />
          </Route>

          <Route
            path="/customer/:id"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <CustomerName
                  setRestrictSide={setRestrictSide}
                  toggle={toggle}
                />
              }
            />
          </Route>

          <Route
            path="/category/new"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <AddCategory
                  setRestrictSide={setRestrictSide}
                  toggle={toggle}
                />
              }
            />
          </Route>

          <Route
            path="/product/new"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <AddProducts
                  setRestrictSide={setRestrictSide}
                  toggle={toggle}
                />
              }
            />
          </Route>

          <Route
            path="/analystics"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <Analystics setRestrictSide={setRestrictSide} toggle={toggle} />
              }
            />
          </Route>

          <Route path="/support" element={<AdminPrivateRoute isAdmin={true} />}>
            <Route
              path=""
              element={
                <CustomerSupport
                  setRestrictSide={setRestrictSide}
                  toggle={toggle}
                />
              }
            />
          </Route>

          <Route
            path="/product/edit/:id"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <EditProducts
                  setRestrictSide={setRestrictSide}
                  toggle={toggle}
                />
              }
            />
          </Route>
          <Route
            path="/notification/new"
            element={<AdminPrivateRoute isAdmin={true} />}
          >
            <Route
              path=""
              element={
                <Notification
                  setRestrictSide={setRestrictSide}
                  toggle={toggle}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
