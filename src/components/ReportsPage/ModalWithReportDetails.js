import React from "react";

import "./ModalWithReportDetails.css";

const ModalWithReportDetails = (props) => {
    let formatDate = () => {
        var dateForFormatting = new Date(chosenCandidate.interviewDate);
        
        var formattedDate =
            (dateForFormatting.getDate()) + "." +
            (dateForFormatting.getMonth() + 1) + "." +
            dateForFormatting.getFullYear() + ".";
        
            
            return formattedDate;
    }
    
        
    let getChosenCandidate = () => {
        const id = parseInt(props.id, 10);
        let chosenCandidate = props.allReportsData.filter((candidate) => {
            if(id === candidate.candidateId) {
                return candidate;
            }
        })
        return chosenCandidate[0];
    }
    
    const chosenCandidate = getChosenCandidate();
    
    return (
        <div className="container-fluid">
            <div className="row">
                <h1 className="col-12 ModalWithReportDetails_header">{chosenCandidate.candidateName}</h1>
                <div className="col-6">
                    <h3>Company</h3>
                    <p>{chosenCandidate.companyName}</p>
                    <h3>Interview Date</h3>
                    <p>{formatDate()}</p>
                    <h3>Phase</h3>
                    <p>{chosenCandidate.phase}</p>
                    <h3>Status</h3>
                    <p>{chosenCandidate.status}</p>
                </div>
                <div className="col-6">
                    <h3>Notes</h3>
                    <p>{chosenCandidate.note}</p>
                </div>
            </div>
        </div>
    );
};

export default ModalWithReportDetails;