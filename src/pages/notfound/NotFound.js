import Header from "../../components/Header";
import Footer from "../../components/Footer";

import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../store";
import robot from "../../img/robot.png";
import sorry from "../../img/sorry.png";

class NotMatch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <div
                    className="text-center"
                    style={{
                        height: "800px",
                        width: "100%",
                        minHeight: "100vh"
                    }}
                >
                    <div style={{ padding: "200px 0px 0px 0px" }}>
                        <img
                            className="text-white text-center animated fadeInDown"
                            src={robot}
                            height="100px"
                        />
                        <img
                            className="text-white text-center animated fadeInDown"
                            src={sorry}
                            height="100px"
                        />
                        <h1
                            className="text-center animated fadeInDown"
                            style={{
                                fontSize: "32px"
                            }}
                        >
                            Page Tidak Ada
          </h1>
                    </div>
                    <br />
                    <br />
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(
    "",
    actions
)(NotMatch);
