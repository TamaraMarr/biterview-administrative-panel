import React from "react";

import "./SingleReport.css";

const SingleReport = (props) => {
    return (
        <table className="SingleReport_table">
            <tbody>
                <tr>
                    <td>{props.reportsData.companyName}</td>
                    <td>{props.reportsData.candidateName}</td>
                    <td>{props.reportsData.interviewDate}</td>
                    <td>{props.reportsData.status}</td>
                    <td className={props.reportsData.key}><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/5968-200.png" style={{ height: "20px" }} alt="details"/></td>
                    <td className={props.reportsData.key}><img src="https://cdn4.iconfinder.com/data/icons/epic-outlines/30/660989-delete_button-128.png" style={{ height: "20px" }} alt="delete"/></td>
                </tr>
            </tbody>
        </table>
    );
};

export default SingleReport;