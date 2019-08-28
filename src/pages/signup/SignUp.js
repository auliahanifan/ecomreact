import Header from "../../components/Header";
import Footer from "../../components/Footer";

import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { Redirect } from 'react-router-dom'
import blackLogo from "../../img/black2.png"

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        };
    }

    setUsername = async event => {
        event.preventDefault();
        await this.setState({ username: event.target.value });
        console.log(this.state.username)
    };

    setEmail = async event => {
        event.preventDefault();
        await this.setState({ email: event.target.value });
        console.log(this.state.email)
    };


    setPassword = async event => {
        event.preventDefault();
        await this.setState({ password: event.target.value });
        console.log(this.state.password)
    };

    doLogin = async e => {
        e.preventDefault();
        const self = this;
        await axios
            .post(this.props.url + "/api/register", {
                username: self.state.username,
                password: self.state.password,
                email: self.state.email
            })
            .then(response => {
                axios
                    .post(this.props.url + "/api/login", {
                        username: self.state.username,
                        password: self.state.password
                    })
                    .then(response => {
                        localStorage.setItem('logged_in', true)
                        localStorage.setItem('user_token', response.data.token)
                        self.props.setLoggedIn({ logged_in: localStorage.getItem('logged_in') })
                        self.props.setUserToken({ user_token: localStorage.getItem('user_token') })
                        alert("Anda Berhasil SignUp!")
                        self.props.history.push('/profile/update')
                    })
                    .catch(error => {
                        console.log(error);
                        alert('Salah Username atau Password! Coba Ulangi')
                    });
            })
            .catch(error => {
                console.log(error);
                alert('Salah Username atau Password! Coba Ulangi')
            });
    };

    render() {
        if (localStorage.getItem('logged_in') !== 'true') {
            return (
                <div>
                    <Header />
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
                                    <h1 class="h3 mb-3 font-weight-normal">Please Sign Up</h1>
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
                                    <label for="inputEmail" class="sr-only">
                                        Email
                  </label>
                                    <input
                                        type="email"
                                        id="inputEmail"
                                        class="form-control"
                                        placeholder="Email"
                                        onChange={event => this.setEmail(event)}
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
                                        Sign Up
                  </button>
                                    <p class="mt-5 mb-3 text-muted">© 2019</p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        } else {
            alert("Anda Sudah Login!")
            return <Redirect to="/" />
        }

    }
}

export default connect('url', actions)(SignUp);
