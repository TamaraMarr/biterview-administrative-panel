import React from "react";

import "./ReportDetails.css";

const SingleReport = (props) => {
    let formatDate = () => {
        var dateForFormatting = new Date(props.allReportsData[props.id].interviewDate);
        
        var formattedDate =
            (dateForFormatting.getDate() + 1) + "." +
            (dateForFormatting.getMonth() + 1) + "." +
            dateForFormatting.getFullYear() + ".";
        
        return formattedDate;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <h1 className="col-12 ReportDetails_header">{props.allReportsData[props.id].candidateName}</h1>
                <div className="col-6">
                    <h3>Company</h3>
                    <p>{props.allReportsData[props.id].companyName}</p>
                    <h3>Interview Date</h3>
                    <p>{formatDate()}</p>
                    <h3>Phase</h3>
                    <p>{props.allReportsData[props.id].phase}</p>
                    <h3>Status</h3>
                    <p>{props.allReportsData[props.id].status}</p>
                </div>
                <div className="col-6">
                    <h3>Notes</h3>
                    <p>{props.allReportsData[props.id].note}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleReport;