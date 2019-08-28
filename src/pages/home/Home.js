import Header from "../../components/Header";
import Footer from "../../components/Footer";

import React from "react";
import ItemHome from "../../components/ItemHome";
import logo from "../../img/black2.png";
import axios from "axios";
import { actions } from "../../store";
import { connect } from "unistore/react";
import { Link } from "react-router-dom";
import CategoryList from "../../components/CategoryList"

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    const self = this;
    await axios
      .get(this.props.url + "/api/category")
      .then(function (response) {
        self.props.setCategory(response.data);
      })
      .catch(function (error) { });
    await axios
      .get(this.props.url + "/api/product/all")
      .then(function (response) {
        self.props.setProduct(response.data);
      })
      .catch(function (error) { });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ minHeight: "100vh" }}>
          <div className="row">
            <div className="col-lg-3 text-center">
              <img src={logo} height="60px" style={{ margin: "10px 0px" }} />
              <div className="list-group">
                <CategoryList />
              </div>
            </div>

            <div className="col-lg-9">
              <div
                id="carouselExampleIndicators"
                className="carousel slide my-4"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    className="active"
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  />
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <img
                      className="d-block img-fluid"
                      src="https://img.jakpost.net/c/2017/04/17/2017_04_17_25228_1492395137._large.jpg"
                      alt="First slide"
                      style={{ height: "350px", width: "900px" }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block img-fluid"
                      src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/06/15/14/pp-hot-coffee-rf-istock.jpg?w968"
                      alt="Second slide"
                      style={{ height: "350px", width: "900px" }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block img-fluid"
                      src="https://img.jakpost.net/c/2019/06/11/2019_06_11_74157_1560246985._large.jpg"
                      alt="Third slide"
                      style={{ height: "350px", width: "900px" }}
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>

              <div className="row">
                {this.props.product.map((item, index) => {
                  return (
                    <ItemHome
                      img_src={item.product_image_url}
                      img_name={item.product_name}
                      img_desc={item.product_description}
                      img_price={item.product_price}
                      link={item.product_id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  "category, product, url",
  actions
)(Home);
