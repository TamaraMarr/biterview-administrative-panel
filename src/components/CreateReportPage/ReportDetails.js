import React from "react";

import "./ReportDetails.css";

let interviewDate;
let phase;
let status;
let note;

export default class ReportDetails extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            noDateProvided: false,
            currentPhase: "",
            interviewDate: ""
        }
        
        this.bindInit();
    }

    bindInit() {
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        let reportDetails = {
            interviewDate: interviewDate.value,
            phase: phase.value,
            status: status.value,
            note: note.value
        }
        
        this.props.letPageKnow(reportDetails);

        interviewDate.value = "";
        phase.value = "";
        status.value = "";
        note.value = "";
        window.location.href="http://localhost:3000/#/reports";
    }
    
    render() {
        return(
            <div className="container">
                <div className="row">
                    <h2 className="col-12 ReportDetails_header">Select Company</h2>
                    <form className="col-12">
                        <input type="date" className="col-4 ReportDetails_date" ref={element => interviewDate = element} id="date" name="interviewDate" />
                        <select className="col-4 ReportDetails_phase" name="phase" ref={element => phase = element}>
                            <option value="cv">CV</option>
                            <option value="hr">HR</option>
                            <option value="tech">Tech</option>
                            <option value="final">Final</option>
                        </select>
                        <select className="col-4 ReportDetails_status" name="status" ref={element => status = element}>
                            <option value="passed">Passed</option>
                            <option value="failed">Failed</option>
                        </select>
                        <textarea className="offset-1 col-10 ReportDetails_note" rows="10" ref={element => note = element}></textarea>
                        <input type="submit" value="Submit" onClick={this.handleSubmit} />
                    </form>
                </div>
            </div>
        );
    }
}