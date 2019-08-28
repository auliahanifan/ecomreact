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
        this.state = {
            product: [],
            transaction: [],
            status: 0
        }
    }

    setStatus = async event => {
        event.preventDefault();
        await this.setState({ status: Number(event.target.value) });
    };


    doEdit = async e => {
        e.preventDefault();
        const self = this;
        await axios
            .put(this.props.url + "/api/transaction/" + String(e.target.value),
                {
                    status: this.state.status
                },
                {
                    headers: {
                        Authorization: "Bearer " + String(localStorage.getItem('admin_token'))
                    }
                })
            .then(response => {
                window.location.reload()
                console.log("Berhasil Mengubah Status Pembayaran")
            })
            .catch(error => {
                // alert(e.target.value)
            });
    };




    componentDidMount = async () => {
        const self = this;
        await axios
            .get(this.props.url + "/api/transaction/all", {
                headers: {
                    Authorization: "Bearer " + String(localStorage.getItem('admin_token'))
                }
            })
            .then(response => {
                this.setState({ transaction: response.data })
            })
            .catch(error => {
                console.log(error);
            });

    }


    render() {
        if (localStorage.getItem('admin_logged_in') == 'true') {
            return (
                <div>
                    <HeaderAdmin />
                    <div className="container-fluid" style={{ minHeight: "100vh" }}>
                        <div className="row">
                            <div className="col-12 text-center">
                                <br />
                                <h1> Transaction Settings </h1>
                                <div className="row justify-content-center">
                                    <div className="col-8">
                                        <p>Petunjuk status pembayaran: <br />
                                            0 = Belum Dibayar <br />
                                            10 = Sudah Dibayar <br />
                                            20 = Barang Sudah Dikirim <br />
                                            30 = Barang Sudah Sampai <br />
                                            98 = Barang Dikembalikan <br />
                                            99 = Pemesanan dibatalkan </p>
                                    </div>
                                </div>
                                <br />
                                <form>
                                    <h4>List Transaction & Edit It</h4>
                                    <div className="table-responsive">
                                        <table class="table ">
                                            <thead>
                                                <tr>
                                                    <th scope="col">TRX ID</th>
                                                    <th scope="col">User ID</th>
                                                    <th scope="col">Total Harga</th>
                                                    <th scope="col">Nama Penerima</th>
                                                    <th scope="col">No. HP</th>
                                                    <th scope="col">Alamat</th>
                                                    <th scope="col">Catatan</th>
                                                    <th scope="col">Status Pembayaran</th>
                                                    <th scope="col">Set New Status</th>
                                                    <th scope="col">Created At</th>
                                                    <th scope="col">Updated At</th>
                                                    <th scope="col">Change</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.transaction.map((item, index) => {

                                                    return (

                                                        <tr>
                                                            <td>{item.transaction_id}</td>
                                                            <td>{item.user_id}</td>
                                                            <td>{item.total_price}</td>
                                                            <td>{item.full_name}</td>
                                                            <td>{item.handphone}</td>
                                                            <td>{item.address}</td>
                                                            <td>{item.note}</td>
                                                            <td>{item.status}</td>
                                                            <td>
                                                                <select className="form-control" id="status pembayaran" onChange={event => this.setStatus(event)}>
                                                                    <option value="0">0</option>
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="30">30</option>
                                                                    <option value="98">98</option>
                                                                    <option value="99">99</option>
                                                                </select></td>
                                                            <td>{item.created_at}</td>
                                                            <td>{item.updated_at}</td>
                                                            <td><button value={item.transaction_id} class="btn btn-lg btn-primary btn-block" type="submit" onClick={e => this.doEdit(e)}>
                                                                Change
                                                        </button>
                                                            </td>
                                                        </tr>

                                                    )
                                                })}


                                            </tbody>
                                        </table>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                    <FooterAdmin />
                </div>
            )
        }

    }
}

export default connect('url', actions)(TransactionAdmin);
