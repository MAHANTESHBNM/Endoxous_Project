import { useState,useEffect } from "react";
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

import store from './redux/store'
import AdminPrivateRoute from './utils/protectiveRoute'
import { getAdmin,loadUser } from "./redux/actions/userAction";


function App() {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getAdmin());
   
}, []);

  return (
    <div className="App">
      <BrowserRouter>
        <SideBar show={show} toggle={toggle} />
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verifyotp" element={<VerifyOTP />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/couponlist" element={<CouponList toggle={toggle} />} />
          <Route path="*" element={<PageNotFound toggle={toggle} />} />

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
        <Route path="" element={<FAQs />} />  </Route>

        <Route path="/orders" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<AllOrders />} />  </Route>

        <Route path="/products" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<AllProducts />} />  </Route>

        <Route path="/dashboard" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<HomePage />} />  </Route>

        <Route path="/orders/:id" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<AllOrdersPage3 />} />  </Route>

        <Route path="/allnurseries" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<AllNurseries />} />  </Route>

        <Route path="/ordersreport" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<OrdersReports />} />  </Route>

        <Route path="/salesreport" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<SalesReport />} />  </Route>

        <Route path="/catagories" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<Categories />} />  </Route>

        <Route path="/customers" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<MyCustomers />} />  </Route>

        <Route path="/customer/:id" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<CustomerName />} />  </Route>

        <Route path="/category/new" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<AddCategory />} />  </Route>

        <Route path="/product/new" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<AddProducts />} />  </Route>

        <Route path="/analystics" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<Analystics />} />  </Route>

        <Route path="/support" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<CustomerSupport />} />  </Route>

        <Route path="/product/edit/:id" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<EditProducts />} />  </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
