import React from "react";

import "./Search.css";

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchedValue: ""
        }

        this.bindInit();
    }

    bindInit() {
        this.catchSearchedTerm = this.catchSearchedTerm.bind(this);
        this.handleEnterClick = this.handleEnterClick.bind(this);
        this.filterData = this.filterData.bind(this);
    }

    catchSearchedTerm(event) {
        let searchedValue = event.target.value;

        this.setState({
            searchedValue
        });
    }

    componentDidMount() {
        this.setState({
            dataForSearch: this.props.dataForSearch
        })
    }

    filterData()  {
        var filteredData = [];
        var dataForFiltering = this.props.dataForSearch;
        var searchString = this.state.searchedValue.toLowerCase();

        dataForFiltering.filter(function(report) {
            const name = report.candidateName.toLowerCase();
            const company = report.companyName.toLowerCase();
            if(name.includes(searchString) || company.includes(searchString)) {
                filteredData.push(report);
            }
        });

        this.props.returnSearchResults(filteredData);
    }
 
    handleEnterClick(event) {
        if(event.key === "Enter") {
            this.filterData();
        }
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <input type="text" onChange={this.catchSearchedTerm} onKeyPress={this.handleEnterClick} value={this.state.searchedValue} className="offset-8 col-3 form-control Search_inputField" />
                    <input type="button" onClick={this.filterData} value="Search" className="col-1 btn Search_searchButton" />
                </div>
            </div>
        )
    }
}