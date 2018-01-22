import React from "react";
import Modal from "react-modal";

import Search from "../../common/Search";
import DataService from "../../services/DataService";
import SingleReport from "./SingleReport";
import ModalWithReportDetails from "./ModalWithReportDetails";

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
            modalIsOpen: false,
            detailsEventTargetId: 0,
            deleteEventTargetId: 0,
            isThereErrorDeleting: false
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
        this.shouldDelete = this.shouldDelete.bind(this);
    }

    componentDidMount() {
        this.getReportsData();
    }

    getReportsData() {
        this.dataService.getReportsData((reportsData) => {
            reportsData.reverse();
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
        if(this.state.reportsData.length === 0) {
            return <tr className="error"><td>There are no data to display at this moment. Try refreshing the page</td></tr>
        } else {
            if(this.state.areResultsFiltered) {
                return this.state.filteredReports.map((report, i) => {
                    return <SingleReport reportsData={report} key={i} id={i} shouldModalDisplay={this.displayModal} getDeleteEventTargetId={this.shouldDelete} />
                });
            } else {
                return this.state.reportsData.map((report, i) => {
                    return <SingleReport reportsData={report} key={i} id={i} shouldModalDisplay={this.displayModal} getDeleteEventTargetId={this.shouldDelete} />
                });
            }
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

    displayModal(shouldDisplayModal, detailsEventTargetId) {
        if(shouldDisplayModal) {
            this.setState({
                modalIsOpen: true
            });
        }
        
        this.setState({
            detailsEventTargetId
        })
    }
    
    shouldDelete(deleteEventTargetId) {
        const reportId = parseInt(deleteEventTargetId, 10);
        
        const chosenReport = this.state.reportsData.filter((report) => {
            if(reportId === report.id) {
                return report;
            }
        });
        
        this.dataService.deleteReport(chosenReport[0].id, (response) => {
            if(response.status >= 200 && response.status <= 399) {
                this.setState({
                    isThereErrorDeleting: false
                });
                setTimeout(() => window.location.reload(), 700);
            } else {
                this.setState({
                    isThereErrorDeleting: true
                });
            }
        }, (error) => {
            this.setState({
                isThereErrorDeleting: true
            });
        })
    }

    render() {
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <Search dataForSearch={this.state.reportsData} returnSearchResults={this.callbackForSearch} />
                    </div>
                </div>
                <table className="table container">
                    <tbody className="ReportsPage_table">
                        <tr className="row">
                            <th className="col-3">Company</th>
                            <th className="col-2">Candidate</th>
                            <th className="col-3">Interview Date</th>
                            <th className="col-2">Status</th>
                            <th colSpan="2" className="col-2">Actions</th>
                        </tr>
                        {this.renderReports()}
                    </tbody>
                </table>
                {this.state.isThereErrorDeleting ? <p className="error">There's been an error - report not deleted</p> : ""}
                <Modal
                    isOpen={this.state.modalIsOpen} 
                    onRequestClose={this.closeModal}
                    style={modalStyle}
                    ariaHideApp={false}
                >
                    <ModalWithReportDetails id={this.state.detailsEventTargetId} allReportsData={this.state.reportsData} />
                </Modal>
            </div>
        );
    }
}