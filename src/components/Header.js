import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/white2.png";
import cart from "../img/cart.png";
import { connect } from "unistore/react";
import { actions } from "../store";
import axios from "axios";
// const logged_in = JSON.parse(localStorage.getItem('logged_in'));
// const user_token = JSON.parse(localStorage.getItem('user_token'));


class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount = async () => {
    await this.props.setLoggedIn({ logged_in: localStorage.getItem('logged_in') })
    await this.props.setUserToken({ user_token: localStorage.getItem('user_token') })
    const self = this;
    axios
      .get(this.props.url + "/api/cart",
        {
          headers: {
            Authorization: "Bearer " + String(localStorage.getItem('user_token'))
          }
        })
      .then(response => {
        self.props.setCartTotalProduct(response.data.length)
      })
      .catch(error => {
        console.log(error);
      });

    await axios
      .get(this.props.url + "/api/product/all")
      .then(function (response) {
        self.props.setProduct(response.data)
      })
      .catch(function (error) { });


  }

  doLogOut = async e => {
    localStorage.setItem('logged_in', "")
    localStorage.setItem('user_token', "")
    this.props.setLoggedIn({ logged_in: "" })
    this.props.setUserToken({ user_token: "" })
    alert('Anda Berhasil Log Out!')
  }

  render() {
    if (localStorage.getItem('logged_in') == 'true') {
      const self = this;
      axios
        .get(this.props.url + "/api/cart",
          {
            headers: {
              Authorization: "Bearer " + String(localStorage.getItem('user_token'))
            }
          })
        .then(response => {
          self.props.setCartTotalProduct(response.data.length)
        })
        .catch(error => {
          console.log(error);
        });

      return (
        <nav
          className="navbar navbar-expand-lg navbar-dark sticky-top"
          style={{ backgroundColor: "#1daa47" }}
        >
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img src={logo} height="40px" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link to="/" className="nav-link">
                    Home
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/shopping/cart" className="nav-link">
                    <img
                      src={cart}
                      height="23px"
                      style={{
                        filter: "grayscale(100%)",
                        WebkitFilter: "invert(100%)"
                      }}
                    />
                    ({this.props.cartTotalProduct})
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/profile" className="nav-link">
                    Profile
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/history" className="nav-link">
                    History
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/" className="nav-link" onClick={e => this.doLogOut(e)}>
                    Log Out
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <nav
          className="navbar navbar-expand-lg navbar-dark sticky-top"
          style={{ backgroundColor: "#1daa47" }}
        >
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img src={logo} height="40px" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">

                <li className="nav-item active">
                  <Link to="/signup" className="nav-link">
                    Sign Up
                      <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/signin" className="nav-link">
                    Sign In
                      <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
  }
}

export default connect(
  "logged_in, user_token, cart, cartTotalProduct, url",
  actions
)(Header);
