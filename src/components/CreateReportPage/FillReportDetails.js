import React from "react";
import DatePicker from "react-date-picker";

import "./FillReportDetails.css";

export default class FillReportDetails extends React.Component {
    constructor(props) {
        super(props)


        this.bindInit();
    }

    bindInit() {
    }


    render() {
        return(
            <div className="container">
                <div className="row">
                    <h2 className="col-12 FillReportDetails_header">Select Company</h2>
                    
                </div>
            </div>
        );
    }
}