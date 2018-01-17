import React from "react";

import "./SelectCompany.css";

export default class SelectCompany extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isSelected: ""
        }

        this.bindInit();
    }

    bindInit() {
        this.handleChosenCompany = this.handleChosenCompany.bind(this);
    }

    handleChosenCompany(id) {
        this.setState({
            isSelected: id
        })

        this.props.letPageKnow(id);
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <h2 className="col-12 SelectCandidate_header">Select Company</h2>
                    <table className="col-12 SelectCandidate_table">
                        <tbody>
                            {this.props.companyInfo.map((company, i) => {
                                return <tr key={i} className={["row", "SelectCompany_row", this.state.isSelected === i ? "active-row" : ""].join(" ")} onClick={() => this.handleChosenCompany(i)}>
                                            <td onClick={() => this.handleChosenCompany(i)}>
                                                <p onClick={() => this.handleChosenCompany(i)}>{company.name}</p>
                                            </td>
                                        </tr>
                                        }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}