import Header from "../../components/Header";
import Footer from "../../components/Footer";

import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { Redirect, Link } from 'react-router-dom'
import userProfileImage from "../../img/user_profile.png"

class SignUp extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount = async () => {
        const self = this;
        // Untuk mendapatkan username
        await axios
            .get("http://0.0.0.0:8000/api/login",
                {
                    headers: {
                        Authorization: "Bearer " + String(localStorage.getItem('user_token'))
                    }
                })
            .then(response => {
                self.props.setUsername(response.data.claims.username)
            })
            .catch(error => {
                console.log(error);
            });
        //  Untuk mendapatkan details
        await axios
            .get("http://0.0.0.0:8000/api/user_details",
                {
                    headers: {
                        Authorization: "Bearer " + String(localStorage.getItem('user_token'))
                    }
                })
            .then(response => {
                this.props.setUserFullName(response.data.full_name)
                this.props.setUserAddress(response.data.address)
                this.props.setUserPhone(response.data.phone)
                if (response.data.sex == "male") {
                    this.props.setUserSex("Laki-laki")
                } else {
                    this.props.setUserSex("Perempuan")
                }
                this.props.setUserProvince(response.data.province)
                this.props.setUserCity(response.data.city)
                this.props.setUserDistrict(response.data.district)
                this.props.setUserZipCode(response.data.zip_code)
                // alert(response.data.phone)
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        if (localStorage.getItem('logged_in') == 'true') {

            return (
                <div>
                    <Header />
                    <div className="container" style={{ minHeight: "100vh" }}>
                        <div className="row justify-content-center">
                            <div className="col-md-12 text-center">
                                <br />
                                <img
                                    class="mb-4"
                                    src={userProfileImage}
                                    alt="userProfileImage"
                                    width="90px"
                                />
                                <h1 class="h3 mb-3 font-weight-normal">Hi, {this.props.username}!</h1>
                                <div className="row justify-content-center">
                                    <div className="col-md-5 text-center">
                                        <table class="table table-borderless">

                                            <tbody>
                                                <tr>
                                                    <td className="text-left">Nama Lengkap:</td>
                                                    <td className="text-left" >{this.props.userFullName}</td>

                                                </tr>
                                                <tr>
                                                    <td className="text-left">Jenis Kelamin:</td>
                                                    <td className="text-left">{this.props.userSex}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left">No. Handphone:</td>
                                                    <td className="text-left">{this.props.userPhone}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left">Address:</td>
                                                    <td className="text-left">{this.props.userAddress}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left">Kecamatan:</td>
                                                    <td className="text-left">{this.props.userDistrict}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left">Kota/Kabupaten:</td>
                                                    <td className="text-left">{this.props.userCity}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left">Provinsi:</td>
                                                    <td className="text-left">{this.props.userProvince}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-left">Kode Pos:</td>
                                                    <td className="text-left">{this.props.userZipCode}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link to="/profile/update">
                                            <button className=" btn-lg btn-primary btn-block" >
                                                Update Informasi Profile
                                        </button>
                                        </Link>
                                        <br />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            );


        } else {
            alert("Silakan Sign In Terlebih Dahulu!")
            return <Redirect to="/" />
        }

    }
}

export default connect('userFullName, userAddress, userSex, userPhone,  username, userProvince, userCity, userDistrict, userZipCode', actions)(SignUp);
