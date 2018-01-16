import React from "react";

import Search from "../../common/Search";
import DataService from "../../services/DataService";
import SingleReport from "./SingleReport";

import "./ReportsPage.css";

export default class ReportsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reportsData: [],
            filteredReports: [],
            areResultsFiltered: false,
            isThereError: false
        }

        this.dataService = new DataService();

        this.bindInit();
    }

    bindInit() {
        this.getReportsData = this.getReportsData.bind(this);
        this.callbackForSearch = this.callbackForSearch.bind(this);
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
                return <SingleReport reportsData={report} key={i} />
            });
        } else {
            return this.state.reportsData.map((report, i) => {
                return <SingleReport reportsData={report} key={i} />
            });
        }
    }

    callbackForSearch(filteredReports) {
        this.setState({
            filteredReports,
            areResultsFiltered: true
        })
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <Search dataForSearch={this.state.reportsData} returnSearchResults={this.callbackForSearch} />

                    <table className="ReportsPage_table">
                        <tbody>
                            <tr>
                                <td>Company</td>
                                <td>Candidate</td>
                                <td>Interview Date</td>
                                <td>Status</td>
                                <td colSpan="2">Actions</td>
                            </tr>
                        </tbody>
                    </table>

                    {this.renderReports()}
                </div>
            </div>
        );
    }
}