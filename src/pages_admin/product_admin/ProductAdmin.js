import HeaderAdmin from "../../components_admin/HeaderAdmin";
import FooterAdmin from "../../components_admin/FooterAdmin";


import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { Redirect } from 'react-router-dom'
import blackLogo from "../../img/black2.png"

class ProductAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            product_name: null,
            product_stock: null,
            product_price: null,
            product_weight: null,
            product_image_url: null,
            product_description: null,
            category_id: null
        }
    }
    setName = async event => {
        event.preventDefault();
        await this.setState({ product_name: event.target.value });
    };

    setDescription = async event => {
        event.preventDefault();
        await this.setState({ product_description: event.target.value });
    };

    setStock = async event => {
        event.preventDefault();
        await this.setState({ product_stock: event.target.value });
    };

    setWeight = async event => {
        event.preventDefault();
        await this.setState({ product_weight: event.target.value });
    };

    setPrice = async event => {
        event.preventDefault();
        await this.setState({ product_price: event.target.value });
    };

    setImageURL = async event => {
        event.preventDefault();
        await this.setState({ product_image_url: event.target.value });
    };

    setCategoryID = async event => {
        event.preventDefault();
        await this.setState({ category_id: event.target.value });
    };



    doSubmit = async e => {
        e.preventDefault();
        const self = this;
        await axios
            .post(this.props.url + "/api/product", {
                product_name: self.state.product_name,
                product_description: self.state.product_description,
                product_weight: self.state.product_weight,
                product_stock: self.state.product_stock,
                product_image_url: self.state.product_image_url,
                product_price: self.state.product_price,
                category_id: self.state.category_id
            },
                {
                    headers: {
                        Authorization: "Bearer " + String(localStorage.getItem('admin_token'))
                    }
                })
            .then(response => {
                window.location.reload()
                console.log("BERHASIL")
            })
            .catch(error => {
                console.log(error);
                console.log("GAGAL")
            });
    };


    doEdit = async e => {
        e.preventDefault();
        const self = this;
        await axios
            .put(this.props.url + "/api/product/" + String(e.target.value), {

                product_name: self.state.product_name,
                product_description: self.state.product_description,
                product_weight: self.state.product_weight,
                product_stock: self.state.product_stock,
                product_image_url: self.state.product_image_url,
                product_price: self.state.product_price,
                category_id: self.state.category_id
            },
                {
                    headers: {
                        Authorization: "Bearer " + String(localStorage.getItem('admin_token'))
                    }
                })
            .then(response => {
                window.location.reload()
                console.log("BERHASIL")
            })
            .catch(error => {
                console.log(error);
                console.log("GAGAL")
            });
    };


    doDelete = async e => {
        e.preventDefault();
        const self = this;
        await axios
            .delete(this.props.url + "/api/product/" + String(e.target.value),
                {
                    headers: {
                        Authorization: "Bearer " + String(localStorage.getItem('admin_token'))
                    }
                })
            .then(response => {
                window.location.reload()
                console.log("BERHASIL")
            })
            .catch(error => {
                // alert(e.target.value)
            });
    };




    componentDidMount = async () => {
        const self = this;
        await axios
            .get(this.props.url + "/api/product/all", {
                headers: {
                    Authorization: "Bearer " + String(localStorage.getItem('admin_token'))
                }
            })
            .then(response => {
                this.setState({ product: response.data })
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
                    <div className="container" style={{ minHeight: "100vh" }}>
                        <div className="row">
                            <div className="col-12">
                                <br />
                                <h1 className="text-center"> Product Settings </h1>
                                <h4>Form Product (Gunakan Ini Untuk Menambah atau Mengubah Product)</h4>
                                <form class="form-signin">
                                    <label for="inputName" class="sr-only">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="inputName"
                                        class="form-control"
                                        placeholder="Name"
                                        onChange={event => this.setName(event)}
                                    />
                                    <br />
                                    <label for="inputDescription" class="sr-only">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        id="inputDescription"
                                        class="form-control"
                                        placeholder="Description"
                                        onChange={event => this.setDescription(event)}
                                    />
                                    <br />
                                    <label for="inputStock" class="sr-only">
                                        Stock
                                    </label>
                                    <input
                                        type="number"
                                        id="inputStock"
                                        class="form-control"
                                        placeholder="Stock"
                                        onChange={event => this.setStock(event)}
                                    />
                                    <br />
                                    <label for="inputPrice" class="sr-only">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        id="inputPrice"
                                        class="form-control"
                                        placeholder="Price"
                                        onChange={event => this.setPrice(event)}
                                    />
                                    <br />
                                    <label for="inputWeight" class="sr-only">
                                        Weight
                                    </label>
                                    <input
                                        type="Number"
                                        id="inputWeight"
                                        class="form-control"
                                        placeholder="Weight"
                                        onChange={event => this.setWeight(event)}
                                    />
                                    <br />
                                    <label for="inputImageURL" class="sr-only">
                                        ImageURL
                                    </label>
                                    <input
                                        type="text"
                                        id="inputImageURL"
                                        class="form-control"
                                        placeholder="ImageURL"
                                        onChange={event => this.setImageURL(event)}
                                    />
                                    <br />
                                    <label for="inputCategoryID" class="sr-only">
                                        CategoryID
                                    </label>
                                    <input
                                        type="number"
                                        id="inputCategoryID"
                                        class="form-control"
                                        placeholder="CategoryID"
                                        onChange={event => this.setCategoryID(event)}
                                    />
                                    <br />

                                    <button class="btn btn-lg btn-primary btn-block" type="submit" onClick={e => this.doSubmit(e)}>
                                        Add
                  </button>

                                </form>
                                <br />
                                <form>
                                    <h4>List Category & Edit It</h4>
                                    <div className="table-responsive">
                                        <table class="table ">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product ID</th>
                                                    <th scope="col">Category ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Stock</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Weight</th>
                                                    <th scope="col">Image URL</th>
                                                    <th scope="col">Created At</th>
                                                    <th scope="col">Updated At</th>
                                                    <th scope="col">Edit</th>
                                                    <th scope="col">Delete</th>



                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.product.map((item, index) => {

                                                    return (

                                                        <tr>
                                                            <td>{item.product_id}</td>
                                                            <td>{item.category_id}</td>
                                                            <td>{item.product_name}</td>
                                                            <td>{item.product_description}</td>
                                                            <td>{item.product_stock}</td>
                                                            <td>Rp. {item.product_price}</td>
                                                            <td>{item.product_weight} gram </td>
                                                            <td>{item.product_image_url.slice(0, 20)}...(cut)</td>
                                                            <td>{item.created_at.slice(0, 26)}</td>
                                                            <td>{item.updated_at.slice(0, 26)}</td>
                                                            <td><button value={item.product_id} class="btn btn-lg btn-primary btn-block" type="submit" onClick={e => this.doEdit(e)}>
                                                                Change
                                                        </button>
                                                            </td>
                                                            <td><button value={item.product_id} class="btn btn-lg btn-danger btn-block" type="submit" onClick={e => this.doDelete(e)}>
                                                                Delete
                                                </button></td>
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

export default connect('url', actions)(ProductAdmin);
