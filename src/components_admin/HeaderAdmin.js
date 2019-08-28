import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/white2.png";
import cart from "../img/cart.png";
import { connect } from "unistore/react";
import { actions } from "../store";
import axios from "axios";
// const logged_in = JSON.parse(localStorage.getItem('logged_in'));
// const user_token = JSON.parse(localStorage.getItem('user_token'));


class HeaderAdmin extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount = async () => {
        // await this.props.setLoggedIn({ logged_in: localStorage.getItem('logged_in') })
        // await this.props.setUserToken({ user_token: localStorage.getItem('user_token') })
        const self = this;
        axios
            .get("http://0.0.0.0:8000/api/cart",
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
            .get("http://0.0.0.0:8000/api/product/all")
            .then(function (response) {
                self.props.setProduct(response.data)
            })
            .catch(function (error) { });


    }

    doLogOut = async e => {
        localStorage.setItem('admin_logged_in', "")
        localStorage.setItem('admin_token', "")
        alert('Anda Berhasil Log Out!')
    }

    render() {
        if (localStorage.getItem('admin_logged_in') == 'true') {
            const self = this;
            axios
                .get("http://0.0.0.0:8000/api/cart",
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
                    style={{ backgroundColor: "#15c6c0" }}
                >
                    <div className="container">
                        <Link to="/admin" className="navbar-brand">
                            <img src={logo} height="40px" />
                        </Link>
                        {/* <ul className="navbar-nav ">
                            <li className="nav-item active">
                                <h6 className="nav-link">
                                    Home
                    <span className="sr-only">(current)</span>
                                </h6>
                            </li>
                        </ul> */}
                        <p className="h4 text-white" style={{ padding: "0px", margin: "0px" }}>Admin Only</p>
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
                                    <Link to="/admin" className="nav-link">
                                        Home
                    <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to="/admin/transaction" className="nav-link">
                                        Transaction
                    <span className="sr-only">(current)</span>
                                    </Link>
                                </li>


                                <li className="nav-item active">
                                    <Link to="/admin/category" className="nav-link">
                                        Category
                    <span className="sr-only">(current)</span>
                                    </Link>
                                </li>

                                <li className="nav-item active">
                                    <Link to="/admin/product" className="nav-link">
                                        Product
                    <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to="/admin" className="nav-link" onClick={e => this.doLogOut(e)}>
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
                    style={{ backgroundColor: "#15c6c0" }}
                >
                    <div className="container">
                        <Link to="/admin" className="navbar-brand">
                            <img src={logo} height="40px" />
                        </Link>
                        <p className="h4 text-white" style={{ padding: "0px", margin: "0px" }}>for Admin</p>

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


                                {/* <li className="nav-item active">
                                    <Link to="/signin" className="nav-link">
                                        Sign In
                      <span className="sr-only">(current)</span>
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
            );
        }
    }
}

export default connect(
    "logged_in, user_token, cart, cartTotalProduct",
    actions
)(HeaderAdmin);
