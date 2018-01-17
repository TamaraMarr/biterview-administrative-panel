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
            isFirstStepBold: "bold",
            isSecondStepBold: "",
            isThirdStepBold: "",
            chosenCandidateId: 0
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

        if(this.props.location.pathname === "/create" || this.props.location.pathname === "/create/stepone") {
            this.setState({
                showSearch: true,
                isFirstStepBold: "bold",
                isSecondStepBold: "",
                isThirdStepBold: ""
            })
        } else if (this.props.location.pathname === "/create/steptwo") {
            this.setState({
                showSearch: true,
                isFirstStepBold: "",
                isSecondStepBold: "bold",
                isThirdStepBold: ""
            })
        } else if (this.props.location.pathname === "/create/stepthree") {
            this.setState({
                showSearch: false,
                isFirstStepBold: "",
                isSecondStepBold: "",
                isThirdStepBold: "bold"
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

    whatPhaseIsActive(event) {
        const currentPhase = event.target.getAttribute("name");

        if(currentPhase === "1step") {
            this.setState({
                showSearch: true,
                isFirstStepBold: "bold",
                isSecondStepBold: "",
                isThirdStepBold: ""
            })
        } else if(currentPhase === "2step") {
            this.setState({
                showSearch: true,
                isFirstStepBold: "",
                isSecondStepBold: "bold",
                isThirdStepBold: ""
            })
        } else {
            this.setState({
                showSearch: false,
                isFirstStepBold: "",
                isSecondStepBold: "",
                isThirdStepBold: "bold"
            })
        }
    }

    catchChosenCandidate({ candidateName, candidateId }) {
        newReport["candidateName"] = candidateName;
        newReport["candidateId"] = candidateId;

        this.setState({
            newReport
        })
    }

    catchChosenCompany({ companyName, companyId }) {
        newReport["companyName"] = companyName;
        newReport["companyId"] = companyId;

        this.setState({
            newReport
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
            console.log(response);
        }, (error) => {
            console.log(error);
        })
    }

    // validateSubmittedData() {
    //     const dataForSubmitting = this.state.newReport;

    //     if()
    // } yet to be implemented

    render() {
        return(
            <div className="container CreateReportPage_container">
                <div className="row">
                    <div className="col-4 CreateReportPage_leftDiv">
                        <Link to="/create/stepone">
                            <p style={{ fontWeight: this.state.isFirstStepBold }} onClick={this.whatPhaseIsActive} name="1step">1 Select Candidate</p>
                        </Link>
                        <Link to="/create/steptwo">
                            <p style={{ fontWeight: this.state.isSecondStepBold }} onClick={this.whatPhaseIsActive} name="2step">2 Select Company</p>
                        </Link>
                        <Link to="/create/stepthree">
                            <p style={{ fontWeight: this.state.isThirdStepBold }} onClick={this.whatPhaseIsActive} name="3step">3 Fill Report Details</p>
                        </Link>
                    </div>
                    <div className="col-8">
                        <Switch>
                            <Redirect exact from='/create' to='/create/stepone' />
                            <Route path='/create/stepone' render={(props) => <SelectCandidate candidatesInfo={this.state.candidatesData} letPageKnow={this.catchChosenCandidate} /> } />
                            <Route path='/create/steptwo' render={(props) => <SelectCompany companyInfo={this.state.companyData} letPageKnow={this.catchChosenCompany}/> } />
                            <Route path='/create/stepthree' render={(props) => <ReportDetails reportsInfo={this.state.reportsData} letPageKnow={this.catchReportDetails} />} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}