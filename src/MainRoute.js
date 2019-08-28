import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
// import { store } from "./store";
import { connect } from "unistore/react";
import { actions } from "./store";

// component
import Header from "./components/Header";
import Footer from "./components/Footer";
//page
import Home from "./pages/home/Home";
import Checkout from "./pages/checkout/Checkout";
import ProductDetails from "./pages/product_details/ProductDetails";
import Cart from "./pages/cart/Cart";
import SignIn from "./pages/signin/SignIn"
import SignUp from "./pages/signup/SignUp"
import UpdateProfile from "./pages/update_profile/UpdateProfile"
import Profile from "./pages/profile/Profile"
import InvoiceDetails from "./pages/invoice_details/InvoiceDetails";
import History from "./pages/history/History"
import NotMatch from "./pages/notfound/NotFound"
// page admin
import SigninAdmin from "./pages_admin/signin_admin/SigninAdmin"
import TransactionAdmin from "./pages_admin/transaction_admin/TransactionAdmin";
import ProductAdmin from "./pages_admin/product_admin/ProductAdmin";
import CategoryAdmin from "./pages_admin/category_admin/CategoryAdmin";

class MainRoute extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* UNTUK USER */}
          <Route exact path="/" component={Home} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/shopping/checkout" component={Checkout} />
          <Route path="/shopping/cart" component={Cart} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile/update" component={UpdateProfile} />
          <Route path="/profile" component={Profile} />
          <Route path="/invoice/:trx_id" component={InvoiceDetails} />
          <Route path="/history" component={History} />
          {/* UNTUK ADMIN */}
          <Route exact path="/admin" component={SigninAdmin} />
          <Route path="/admin/transaction" component={TransactionAdmin} />
          <Route path="/admin/product" component={ProductAdmin} />
          <Route path="/admin/category" component={CategoryAdmin} />
          <Route component={NotMatch} />
        </Switch>
      </Router>
    );
  }
}

export default connect(
  "",
  actions
)(MainRoute);
