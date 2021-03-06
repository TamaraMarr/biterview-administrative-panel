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
        this.handleEnterClick = this.handleEnterClick.bind(this);
        this.filterData = this.filterData.bind(this);
    }

    componentDidMount() {
        this.setState({
            dataForSearch: this.props.dataForSearch
        })
    }

    filterData(event)  {
        this.setState({
            searchedValue: event.target.value
        })

        var filteredData = [];
        var dataForFiltering = this.props.dataForSearch;
        var searchString = event.target.value.toLowerCase();
        
        dataForFiltering.filter(function(report) {
            const name = report.candidateName.toLowerCase();
            const company = report.companyName.toLowerCase();
            if(name.includes(searchString) || company.includes(searchString)) {
                filteredData.push(report);
            }
        });
        
        if(!searchString) {
            this.props.returnSearchResults(this.props.dataForSearch);
        } else {
            this.props.returnSearchResults(filteredData);
        }
    }
    
    handleEnterClick(event) {
        if(event.key === "Enter") {
            this.filterData();
        }
    }
    
    render() {
        return (
            <input type="text" onChange={this.filterData} onKeyPress={this.handleEnterClick} value={this.state.searchedValue} className="col-12 form-control Search_inputField" />
        )
    }
}