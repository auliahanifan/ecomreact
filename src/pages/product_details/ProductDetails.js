import Header from "../../components/Header";
import Footer from "../../components/Footer";


import React from "react";
import CarouselProductDetails from "../../components/CarouselProductDetails";
import axios from "axios";
import { actions } from "../../store";
import { connect } from "unistore/react";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      weight: 0,
      price: 0,
      photo: "",
      id: 0,
      description: "",
      stock: 0,
      qty: 1,
      subtotal_price: 0,
      cart: 0,
      cartList: []
    };
  }

  addToCart = async e => {
    e.preventDefault();
    const self = this;
    axios
      .post(this.props.url + "/api/cart", {
        product_id: self.state.id,
        qty: self.state.qty,
      }, {
          headers: {
            Authorization: "Bearer " + String(localStorage.getItem('user_token'))
          }
        })
      .then(response => {
        this.setState({ cart: Number(this.state.cart) + Number(1) });
        this.props.tambahCart(this.state.cart);
        alert("Barang yang anda pilih telah masuk keranjang!")
        self.props.history.push('/shopping/cart')
      })
      .catch(error => {
        alert('Terjadi kesalahan!')
      });

  };

  setQty = async event => {
    event.preventDefault();
    await this.setState({ qty: Number(event.target.value) });
    await this.setState({ subtotal_price: this.state.price * this.state.qty });
    console.log(this.state.qty)
  };

  componentDidMount = async () => {
    const self = this;
    await axios
      .get(
        this.props.url + "/api/product/" + String(self.props.match.params.id)
      )
      .then(response => {
        console.log("get product", response.data);
        this.setState({
          description: response.data.product_description,
          weight: response.data.product_weight,
          name: response.data.product_name,
          price: response.data.product_price,
          photo: response.data.product_image_url,
          id: response.data.product_id,
          stock: response.data.product_stock,
          subtotal_price: response.data.product_price,
          cart: this.props.cart,
          cartList: this.props.cartList
        });
      })
      .catch(error => {
        console.log("error product", error);
      });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ minHeight: "100vh" }}>
          <div className="row">
            <div className="col-12">
              <br />
            </div>
            <div className="col-lg-6">
              <CarouselProductDetails img_src={this.state.photo} />
            </div>
            <div className="col-lg-6">
              <table>
                <tr>
                  <td width="100%">
                    <form>
                      <div class="card w-100">
                        <div className="card-body text-left">
                          <h1 className="card-title">{this.state.name}</h1>
                          <h3 className="card-subtitle mb-2 text-muted">
                            Rp. {this.state.price}
                          </h3>
                          <p className="card-text">{this.state.description}</p>

                          <div className="row justify-content-between">
                            <div className="col-6">
                              Stock: <br />
                            </div>
                            <div className="col-6 text-right">
                              {this.state.stock}<br />
                              <br />
                            </div>
                            <div className="col-6">
                              <p className="card-text"> Quantity : </p>

                              <h3 className="card-subtitle mb-2 text-muted">
                                Subtotal:
                            </h3>
                              <h2 className="card-subtitle mb-2 text-muted">
                                {this.state.subtotal_price}
                              </h2>
                            </div>

                            <div className="col-6 text-right">

                              <input
                                type="number"
                                name="quantity"
                                min="1"
                                max="100"
                                onChange={e => this.setQty(e)}
                                style={{ width: "50%" }}
                              />
                              <br />
                              <br />
                              <button
                                type="button"
                                className="btn btn-primary"
                                style={{ width: "100px" }}
                                onClick={e => this.addToCart(e)}
                              >
                                Beli
                            </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="col-12">
            <br />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  "cart, cartList, url",
  actions
)(ProductDetails);
