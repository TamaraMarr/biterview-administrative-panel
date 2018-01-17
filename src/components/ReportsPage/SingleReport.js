import React from "react";

import "./SingleReport.css";

const SingleReport = (props) => {
    let sendModalDataToReportsPage = (event) => {
        props.shouldModalDisplay(true, event.target.id);
    }

    let sendDeleteDataToReportsPage = (event) => {
        props.getDeleteEventTargetId(true, event.target.id - 10);
    }

    let formatDate = () => {
        var dateForFormatting = new Date(props.reportsData.interviewDate);
        
        var formattedDate =
            (dateForFormatting.getDate() + 1) + "." +
            (dateForFormatting.getMonth() + 1) + "." +
            dateForFormatting.getFullYear() + ".";
        
        return formattedDate;
    }
    
    return (
            <tr className="row SingleReport_table">
                <td className="col-3">{props.reportsData.companyName}</td>
                <td className="col-2">{props.reportsData.candidateName}</td>
                <td className="col-3">{formatDate()}</td>
                <td className="col-2">{props.reportsData.status}</td>
                <td className="col-1" onClick={sendModalDataToReportsPage}><img id={props.id} src="https://image.freepik.com/free-icon/eye_318-80708.jpg" className="SingleReport_ico" alt="details"/></td>
                <td className="col-1" onClick={sendDeleteDataToReportsPage}><img id={props.id + 10} src="https://static.independent.co.uk/static-assets/close-video-preroll.svg" className="SingleReport_ico" style={{ height: "20px" }} alt="delete"/></td>
            </tr>
    );
};

export default SingleReport;