import React from "react";
import { Link } from "react-router-dom";

import "./SelectCompany.css";

export default class SelectCompany extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isSelected: "",
            isDisabled: "disabled"
        }

        this.bindInit();
    }

    bindInit() {
        this.handleChosenCompany = this.handleChosenCompany.bind(this);
    }

    componentDidMount() {
        this.props.changePhase();
    }

    handleChosenCompany(id) {
        this.setState({
            isSelected: id,
            isDisabled: ""
        })

        let companyInfo = {
            companyName: this.props.companyInfo[id].name,
            companyId: this.props.companyInfo[id].id,
        }

        this.props.letPageKnow(companyInfo);
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
                    <Link to="/create/stepone" className="offset-1">
                        <button className="btn" onClick={() => this.props.changePhase()}>Back</button>
                    </Link>
                    <Link to="/create/stepthree" className="offset-9">
                        <button className="btn" disabled={this.state.isDisabled}>Next</button>
                    </Link>

                </div>
            </div>
        );
    }
}