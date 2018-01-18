import React from "react";
import { Link } from "react-router-dom";

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
            interviewDate: "",
            error: false
        }
        
        this.bindInit();
    }

    bindInit() {
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateDetails = this.validateDetails.bind(this);
    }

    componentDidMount() {
        this.props.changePhase();
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            noDateProvided: false,
            dateError: false,
            noteError: false
        })

        let reportDetails = {
            interviewDate: interviewDate.value,
            phase: phase.value,
            status: status.value,
            note: note.value
        }

        if (this.validateDetails(reportDetails) === 1) {
            this.setState({
                noDateProvided: true
            });
            return;
        }
        
        if (this.validateDetails(reportDetails) === 2) {
            this.setState({
                dateError: true,
                noteError: true
            })
            return;
        }

        if (this.validateDetails(reportDetails) === 3) {
            this.setState({
                dateError: true
            })
            return;
        }
        if (this.validateDetails(reportDetails) === 4) {
            this.setState({
                noteError: true
            });
            return;
        }

        this.props.letPageKnow(reportDetails);

        interviewDate.value = "";
        phase.value = "";
        status.value = "";
        note.value = "";
    }

    validateDetails({ interviewDate, note }) {
        const maxDate = this.getTodaysDate();

        if(!interviewDate) {
            return 1;
        }
        
        const dateEntered = new Date(interviewDate).getTime();

        if(dateEntered > maxDate && note === "") {
            return 2;
        }
        
        if(dateEntered > maxDate) {
            return 3;
        }
        
        if(note === "") {
            return 4;
        }

        return true;
    }
    
    getTodaysDate() {
        const maxDate = new Date().getTime();

        return maxDate;
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <h2 className="col-12 ReportDetails_header">Select Company</h2>
                    <form className="col-12">
                        <input type="date" className="col-4 ReportDetails_date" placeholder="YYYY-MM-DD" ref={element => interviewDate = element} id="date" name="interviewDate" />
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
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Link to="/create/steptwo">
                                <button className="btn">Back</button>
                            </Link>
                            <input type="submit" value="Submit" onClick={this.handleSubmit} className="btn" />
                        </div>
                    </form>
                    {this.state.dateError ? <div className="errorDiv"><p className="error">You can't choose a date in the future</p><br /></div> : ""}
                    {this.state.noDateProvided ? <div className="errorDiv"><p className="error">Please enter an interview date</p><br /></div> : ""}
                    {this.state.noteError ? <div className="errorDiv"><p className="error">Please fill out the Note section</p><br /></div> : ""}
                </div>
            </div>
        );
    }
}