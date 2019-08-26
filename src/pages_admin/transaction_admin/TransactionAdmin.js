import HeaderAdmin from "../../components_admin/HeaderAdmin";
import FooterAdmin from "../../components_admin/FooterAdmin";


import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { Redirect } from 'react-router-dom'
import blackLogo from "../../img/black2.png"

class TransactionAdmin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (localStorage.getItem('admin_logged_in') == 'true') {
            return (
                <div>
                    <HeaderAdmin />
                    <div className="container" style={{ minHeight: "100vh" }}>
                        <div className="row">
                            <div className="col-12 text-center">
                                <br />
                                <h1> Transaction Settings </h1>

                            </div>
                        </div>
                    </div>
                    <FooterAdmin />
                </div>
            )
        }

    }
}

export default connect('', actions)(TransactionAdmin);
