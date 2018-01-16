import React from "react";

import "./SingleReport.css";

const SingleReport = (props) => {
    return (
            <tr className="row SingleReport_table">
                <td className="col-3">{props.reportsData.companyName}</td>
                <td className="col-2">{props.reportsData.candidateName}</td>
                <td className="col-3">{props.reportsData.interviewDate}</td>
                <td className="col-2">{props.reportsData.status}</td>
                <td className={`${props.reportsData.key}, col-1`} onClick={() => props.shouldModalDisplay(true)}><img src="https://image.freepik.com/free-icon/eye_318-80708.jpg" className="SingleReport_ico" alt="details"/></td>
                <td className={`${props.reportsData.key}, col-1`}><img src="https://static.independent.co.uk/static-assets/close-video-preroll.svg" className="SingleReport_ico" style={{ height: "20px" }} alt="delete"/></td>
            </tr>
    );
};

export default SingleReport;