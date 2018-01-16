import React from "react";
import Modal from "react-modal";

import Search from "../../common/Search";
import DataService from "../../services/DataService";
import SingleReport from "./SingleReport";
import ReportDetails from "./ReportDetails";

import "./ReportsPage.css";

const modalStyle = {
    content: {
        height: "50%",
        maxWidth: "70%",
        margin: "0 auto",
        marginTop: "10vh"
    }
};

export default class ReportsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reportsData: [],
            filteredReports: [],
            areResultsFiltered: false,
            isThereError: false,
            modalIsOpen: false
        }

        this.dataService = new DataService();

        this.bindInit();
    }

    bindInit() {
        this.getReportsData = this.getReportsData.bind(this);
        this.callbackForSearch = this.callbackForSearch.bind(this);
        this.displayModal = this.displayModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.getReportsData();
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

    renderReports() {
        if(this.state.areResultsFiltered) {
            return this.state.filteredReports.map((report, i) => {
                return <SingleReport reportsData={report} key={i} shouldModalDisplay={this.displayModal} />
            });
        } else {
            return this.state.reportsData.map((report, i) => {
                return <SingleReport reportsData={report} key={i} shouldModalDisplay={this.displayModal} />
            });
        }
    }

    callbackForSearch(filteredReports) {
        this.setState({
            filteredReports,
            areResultsFiltered: true
        })
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    displayModal(shouldDisplayModal) {
        if(shouldDisplayModal) {
            this.setState({
                modalIsOpen: true
            });
        }
    }

    render() {
        return(
            <div>
            <div className="container">
                <div className="row">
                    <Search dataForSearch={this.state.reportsData} returnSearchResults={this.callbackForSearch} />
                </div>
            </div>
                <table className="container">
                    <tbody className="ReportsPage_table">
                        <tr className="row">
                            <th className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">Company</th>
                            <th className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">Candidate</th>
                            <th className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">Interview Date</th>
                            <th className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">Status</th>
                            <th colSpan="2" className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">Actions</th>
                        </tr>
                        {this.renderReports()}
                    </tbody>
                </table>
                <Modal
                    isOpen={this.state.modalIsOpen} 
                    onRequestClose={this.closeModal}
                    style={modalStyle}
                >
                    <ReportDetails />
                </Modal>
            </div>
        );
    }
}