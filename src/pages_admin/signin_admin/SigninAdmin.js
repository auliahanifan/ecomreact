import HeaderAdmin from "../../components_admin/HeaderAdmin";
import FooterAdmin from "../../components_admin/FooterAdmin";


import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { Redirect, Link } from 'react-router-dom'
import blackLogo from "../../img/black2.png"

class SigninAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      product: []
    };
  }

  setUsername = async event => {
    event.preventDefault();
    await this.setState({ username: event.target.value });
  };

  setPassword = async event => {
    event.preventDefault();
    await this.setState({ password: event.target.value });
  };

  doLogin = async e => {
    e.preventDefault();
    const self = this;
    await axios
      .post(this.props.url + "/api/login/admin", {
        username: self.state.username,
        password: self.state.password
      })
      .then(response => {
        localStorage.setItem('admin_logged_in', true)
        localStorage.setItem('admin_token', response.data.token)

        window.location.reload()
      })
      .catch(error => {
        alert('Salah Username atau Password! Coba Ulangi')
      });
  };

  render() {
    // Check if logged in or not
    if (localStorage.getItem('admin_logged_in') !== 'true') {
      return (
        <div>
          <HeaderAdmin />

          <div className="container" style={{ minHeight: "100vh" }}>
            <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                <form class="form-signin">
                  <br />
                  <br />
                  <br />
                  <img
                    class="mb-4"
                    src={blackLogo}
                    alt="Ba-ik"
                  />
                  <h1 class="h3 mb-3 font-weight-normal">Please Sign In Now</h1>
                  <label for="inputUsername" class="sr-only">
                    Username
                  </label>
                  <input
                    type="text"
                    id="inputUsername"
                    class="form-control"
                    placeholder="Username"
                    onChange={event => this.setUsername(event)}
                  />
                  <br />
                  <label for="inputPassword" class="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    onChange={event => this.setPassword(event)}
                  />
                  <br />
                  <button class="btn btn-lg btn-primary btn-block" type="submit" onClick={e => this.doLogin(e)}>
                    Sign in
                  </button>
                  <p class="mt-5 mb-3 text-muted">© 2019</p>
                </form>
              </div>
            </div>
          </div>
          <FooterAdmin />
        </div>
      );
    } else {
      return (
        <div>
          <HeaderAdmin />
          <div className="container" style={{ minHeight: "100vh" }}>
            <div className="row">
              <div className="col-12 text-center">
                <br />
                <h1> Selamat Datang di Halaman Admin!</h1>
                <h4>Silakan pilih menu:</h4>
                <h6>* Bisa juga gunakan menu header diatas</h6>
                <Link to="/admin/transaction">
                  <button type="button" class="btn btn-primary btn-lg btn-block">Transaction</button>
                </Link>
                <Link to="/admin/category">
                  <button type="button" class="btn btn-secondary btn-lg btn-block">Category</button>
                </Link>
                <Link to="admin/product">
                  <button type="button" class="btn btn-success btn-lg btn-block">Product</button>
                </Link>

              </div>
            </div>
          </div>
          <FooterAdmin />
        </div>
      )
    }

  }
}

export default connect('url', actions)(SigninAdmin);
