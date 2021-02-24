import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import Mybag from "./Mybag";
import Checkout from "./Checkout";
import SortCategory from "./SortCategory";
import AddProduct from "../components/MyProfile/AddProduct";
import Update from "./Update";
import MyProfile from "./MyProfile";
import Filter from "./Filter";
import Search from "./Search";
import GetProduct from "../components/MyProfile/GetProduct";
import PrivateRouter from "../components/Privaterouter";
import RoutePrivate from "../components/RoutePrivate";
import EditProduct from "../components/MyProfile/EditProduct";
import GetOrder from "../components/MyProfile/GetOrder";
import ChangePassword from "../components/MyProfile/ChangePassword";
import ShippingAddress from "../components/MyProfile/ShippingAddress";
import GetOrderSeller from "../components/MyProfile/GetOrderSeller";

// Login Page
// import Login from "../components/";
import Register from "../components/Login/Register";
import OtpConfrim from "../components/Login/OtpConfrim";
import KonfirmasiPassword from "../components/Login/KonfirmasiPassword";
import Auth from "./Auth";
import Chat from "../components/Chat/Chat";

export default function Router() {
  return (
    <BrowserRouter>
     <Route path="/" exact component={Home} />
      <RoutePrivate path="/products/:id" component={Product} />
      <PrivateRouter path="/mybag" component={Mybag} />
      <PrivateRouter path="/checkout" component={Checkout} />
      <PrivateRouter path="/profile" component={MyProfile} />
      <PrivateRouter path="/inputProduct" component={AddProduct} />
      <PrivateRouter path="/edit/:id" component={EditProduct} />
      <PrivateRouter path="/myproduct" component={GetProduct} />
      <PrivateRouter path="/shippingAddress" component={ShippingAddress} />
      <PrivateRouter path="/myorder" component={GetOrder} />
      <PrivateRouter path="/update" component={Update} />
      <PrivateRouter path="/chat" component={Chat} />
      <PrivateRouter path="/sellerOrder" component={GetOrderSeller} />
      <Route path="/category/:id_categories" component={SortCategory} />
      <Route path="/search" component={Search} />
      <Route path="/filter" component={Filter} />
      <Route path="/login" component={Auth} />
      <Route path="/otp" component={OtpConfrim} />
      <Route path="/confrim" component={KonfirmasiPassword} />
      <Route path="/register" component={Register} />
      <Route path="/change" component={ChangePassword} />
    </BrowserRouter>
  );
}
