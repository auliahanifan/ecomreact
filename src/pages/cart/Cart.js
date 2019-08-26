import Header from "../../components/Header";
import Footer from "../../components/Footer";

import React from "react";
import CartProductUnit from "../../components/CartProductUnit";
import CartFooter from "../../components/CartFooter";
import axios from "axios";
import { actions } from "../../store";
import { connect } from "unistore/react";


class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total_price: 0
    };
  }

  componentDidMount = async () => {
    const self = this;
    await axios
      .get("http://0.0.0.0:8000/api/product/all")
      .then(function (response) {
        self.props.setProduct(response.data);

      })
      .catch(function (error) { });


    await axios
      .get("http://0.0.0.0:8000/api/cart",
        {
          headers: {
            Authorization: "Bearer " + String(localStorage.getItem('user_token'))
          }
        })
      .then(response => {
        self.props.setCartList(response.data)
      })
      .catch(error => {
        console.log(error);
      });


    var total_price = 0
    console.log(self.props.cartList)
    await this.props.cartList.map((item, index) => {
      total_price += item.price

      console.log("apa")
    })
    await self.setState({ total_price: total_price })
    console.log(total_price)
    console.log(self.state.total_price)
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ minHeight: "100vh" }}>
          <br />
          <h3 className="card-title">Keranjang Belanja</h3>
          {this.props.cartList.map((item, index) => {

            return <CartProductUnit price={item.price} qty={item.qty} name={item.product_name} img_src={this.props.product[index].product_image_url} onClick={item.cart_id} />
          })}

          <CartFooter total_price={this.state.total_price} />
          <br />
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect("cart, cartList, cartTotalPrice, product", actions)(Cart);
