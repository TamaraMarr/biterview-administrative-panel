import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import DataService from "../../services/DataService";
import SelectCandidate from "./SelectCandidate";
import SelectCompany from "./SelectCompany";
import ReportDetails from "./ReportDetails";

import "./CreateReportPage.css";

const newReport = {};

export default class CreateReportPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            candidatesData: [],
            companyData: [],
            reportsData: [],
            newReport: {},
            isThereError: false,
            createReportError: false,
            isFirstStepActive: "bold",
            isSecondStepActive: "",
            isThirdStepActive: "",
            chosenCandidateId: 0,
            chosenCandidateName: "",
            chosenCompanyName: ""
        }

        this.dataService = new DataService();

        this.bindInit();
    }

    bindInit() {
        this.catchChosenCandidate = this.catchChosenCandidate.bind(this);
        this.catchChosenCompany = this.catchChosenCompany.bind(this);
        this.catchReportDetails = this.catchReportDetails.bind(this);
        this.whatPhaseIsActive = this.whatPhaseIsActive.bind(this);
    }

    componentDidMount() {
        this.getReportsData();
        this.getCandidatesData();
        this.getCompanyData();
        this.whatPhaseIsActive();
    }

    whatPhaseIsActive() {
        if(this.props.location.pathname === "/create" || this.props.location.pathname === "/create/stepone") {
            this.setState({
                showSearch: true,
                isFirstStepActive: "bold",
                isSecondStepActive: "",
                isThirdStepActive: ""
            })
        } else if (this.props.location.pathname === "/create/steptwo") {
            this.setState({
                showSearch: true,
                isFirstStepActive: "",
                isSecondStepActive: "bold",
                isThirdStepActive: ""
            })
        } else if (this.props.location.pathname === "/create/stepthree") {
            this.setState({
                showSearch: false,
                isFirstStepActive: "",
                isSecondStepActive: "",
                isThirdStepActive: "bold"
            })
        }
    }

    getReportsData() {
        this.dataService.getReportsData((reportsData) => {
            this.setState({
                reportsData
            });
        }, (error) => {
            this.setState({
                isThereError: true
            })
        });
    }

    getCandidatesData() {
        this.dataService.getCandidateData((candidatesData) => {
            this.setState({
                candidatesData
            });
        }, (error) => {
            this.setState({
                isThereError: true
            })
        });
    }

    getCompanyData() {
        this.dataService.getCompanyData((companyData) => {
            this.setState({
                companyData
            });
        }, (error) => {
            this.setState({
                isThereError: true
            })
        });

    }

    catchChosenCandidate({ candidateName, candidateId }) {
        newReport["candidateName"] = candidateName;
        newReport["candidateId"] = candidateId;

        this.setState({
            newReport,
            chosenCandidateName: candidateName
        })
    }

    catchChosenCompany({ companyName, companyId }) {
        newReport["companyName"] = companyName;
        newReport["companyId"] = companyId;

        this.setState({
            newReport,
            chosenCompanyName: companyName
        })
    }

    catchReportDetails({ interviewDate, phase, status, note }) {
        newReport["interviewDate"] = interviewDate;
        newReport["phase"] = phase;
        newReport["status"] = status;
        newReport["note"] =  note;

        this.setState({
            newReport
        })

        this.dataService.createReport(this.state.newReport, (response) => {
            setTimeout(() => window.location.href="http://localhost:3000/#/reports", 900);
        }, (error) => {
            this.setState({
                createReportError: true
            })
        })
    }

    render() {
        return(
            <div className="container CreateReportPage_container">
                <div className="row">
                    <div className="col-4 CreateReportPage_leftDiv">
                        <p style={{ fontWeight: this.state.isFirstStepActive }}>1 Select Candidate</p>
                        <p style={{ fontWeight: this.state.isSecondStepActive }}>2 Select Company</p>
                        <p style={{ fontWeight: this.state.isThirdStepActive }}>3 Fill Report Details</p>
                        {this.state.chosenCandidateName ? <div><hr /><h6 style={{ fontWeight: "bold"}}>Chosen candidate:</h6><p>{this.state.chosenCandidateName}</p></div> : ""}
                        {this.state.chosenCompanyName ? <div><hr /><h6 style={{ fontWeight: "bold"}}>Chosen company:</h6><p>{this.state.chosenCompanyName}</p></div> : ""}
                    </div>
                    <div style={{ textAlign: "center" }}>
                        {this.state.isThereError ? <p className="error">There's been an error. Please reload the page</p> : ""}
                        {this.state.createReportError ? <p className="error">Report was not created, please refresh the page and try again</p> : ""}
                    </div>
                    <div className="col-8">
                        <Switch>
                            <Redirect exact from='/create' to='/create/stepone' />
                            <Route path='/create/stepone' render={(props) => <SelectCandidate candidatesInfo={this.state.candidatesData} letPageKnow={this.catchChosenCandidate} changePhase={this.whatPhaseIsActive} />} />
                            <Route path='/create/steptwo' render={(props) => <SelectCompany companyInfo={this.state.companyData} letPageKnow={this.catchChosenCompany} changePhase={this.whatPhaseIsActive} />} />
                            <Route path='/create/stepthree' render={(props) => <ReportDetails reportsInfo={this.state.reportsData} letPageKnow={this.catchReportDetails} changePhase={this.whatPhaseIsActive} />} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}