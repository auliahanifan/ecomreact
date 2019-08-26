import Header from "../../components/Header";
import Footer from "../../components/Footer";

import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { Redirect } from 'react-router-dom'
import blackLogo from "../../img/black2.png"


class UpdateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: "",
            address: "",
            sex: "male",
            phone: "",
            province: "",
            city: "",
            district: "",
            zip_code: ""
        };
    }

    setFullname = async event => {
        event.preventDefault();
        await this.setState({ full_name: event.target.value });

    };

    setAddress = async event => {
        event.preventDefault();
        await this.setState({ address: event.target.value });


    };


    setHandphone = async event => {
        event.preventDefault();
        await this.setState({ phone: event.target.value });

    };

    setSex = async event => {
        event.preventDefault();
        await this.setState({ sex: event.target.value });
    };

    setProvince = async event => {
        event.preventDefault();
        await this.setState({ province: event.target.value });

    };

    setCity = async event => {
        event.preventDefault();
        await this.setState({ city: event.target.value });

    };

    setDistrict = async event => {
        event.preventDefault();
        await this.setState({ district: event.target.value });

    };

    setZipCode = async event => {
        event.preventDefault();
        await this.setState({ zip_code: event.target.value });

    };





    doComplete = async e => {
        e.preventDefault();
        const self = this;
        await axios
            .post("http://0.0.0.0:8000/api/user_details", {
                full_name: self.state.full_name,
                address: self.state.address,
                sex: self.state.sex,
                phone: self.state.phone,
                province: self.state.province,
                city: self.state.city,
                district: self.state.district,
                zip_code: self.state.zip_code
            }, {
                    headers: {
                        Authorization: "Bearer " + String(localStorage.getItem('user_token'))
                    }
                })
            .then(response => {
                console.log("Terimakasih Telah Melengkapi Profil!")
                self.props.history.push('/')
            })
            .catch(error => {
                axios
                    .put("http://0.0.0.0:8000/api/user_details", {
                        full_name: self.state.full_name,
                        address: self.state.address,
                        sex: self.state.sex,
                        phone: self.state.phone,
                        province: self.state.province,
                        city: self.state.city,
                        district: self.state.district,
                        zip_code: self.state.zip_code
                    }, {
                            headers: {
                                Authorization: "Bearer " + String(localStorage.getItem('user_token'))
                            }
                        })
                    .then(response => {
                        alert("Terimakasih Telah Melengkapi Profil!")
                        self.props.history.push('/')
                    })
                    .catch(error => {
                        alert('Terjadi kesalahan!')
                    });
            });
    };

    render() {
        return (
            <div>
                <Header />
                <div className="container" style={{ minHeight: "100vh" }}>
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center">
                            <form class="form-signin" onSubmit={e => this.doComplete(e)}>
                                <br />
                                <br />
                                <br />
                                <img
                                    class="mb-4"
                                    src={blackLogo}
                                    alt="Ba-ik"
                                />
                                <h1 class="h3 mb-3 font-weight-normal">Update Your Profile</h1>
                                <label for="inputFullname" class="sr-only">
                                    Fullname
                  </label>
                                <input
                                    type="text"
                                    id="inputFullname"
                                    class="form-control"
                                    placeholder="Nama Lengkap"
                                    onChange={event => this.setFullname(event)}
                                    required="required"
                                />
                                <br />
                                <label for="inputSex" class="sr-only">
                                    Sex
                                </label>
                                <select className="form-control" id="gender" onChange={event => this.setSex(event)}>
                                    <option value="male">Laki-laki</option>
                                    <option value="female">Perempuan</option>
                                </select>
                                <br />
                                <label for="inputHandphone" class="sr-only">
                                    No. Handphone
                  </label>
                                <input
                                    type="text"
                                    id="inputHandphone"
                                    class="form-control"
                                    placeholder="No. Handphone"
                                    onChange={event => this.setHandphone(event)}
                                    required="required"
                                />
                                <br />
                                <label for="inputAddress" class="sr-only">
                                    Address
                                </label>
                                <textarea placeholder="Jln. RT/RW" class="form-control" id="note" row="5" onChange={(event) => this.setAddress(event)} required="required" />
                                <br />
                                <label for="inputDistrict" class="sr-only">
                                    District
                  </label>
                                <input
                                    type="text"
                                    id="inputDistrict"
                                    class="form-control"
                                    placeholder="Kecamatan"
                                    onChange={event => this.setDistrict(event)}
                                    required="required"
                                />
                                <br />
                                <label for="inputCity" class="sr-only">
                                    City
                  </label>
                                <input
                                    type="text"
                                    id="inputCity"
                                    class="form-control"
                                    placeholder="Kota/Kabupaten"
                                    onChange={event => this.setCity(event)}
                                    required="required"
                                />
                                <br />
                                <label for="inputProvince" class="sr-only">
                                    Province
                  </label>
                                <input
                                    type="text"
                                    id="inputProvince"
                                    class="form-control"
                                    placeholder="Provinsi"
                                    onChange={event => this.setProvince(event)}
                                    required="required" />
                                <br />
                                <label for="inputZipCode" class="sr-only">
                                    ZipCode
                  </label>
                                <input
                                    type="text"
                                    id="inputZipCode"
                                    class="form-control"
                                    placeholder="Kode Pos"
                                    onChange={event => this.setZipCode(event)}
                                    required="required" />
                                <br />
                                <button class="btn btn-lg btn-primary btn-block" type="submit" >
                                    Update Now
                            </button>
                                <br />
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect('', actions)(UpdateProfile);
