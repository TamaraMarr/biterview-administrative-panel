import React from "react";
import { Link } from "react-router-dom";

import "./SelectCandidate.css";

export default class SelectCandidate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            bgColor: "",
            isSelected: "",
            isDisabled: "disabled"
        }

        this.bindInit();
    }

    bindInit() {
        this.handleChosenCandidate = this.handleChosenCandidate.bind(this);
    }

    componentDidMount() {
        this.props.changePhase();
    }

    handleChosenCandidate(id) {
        this.setState({
            isSelected: id,
            isDisabled: ""
        })

        let candidateInfo = {
            candidateName: this.props.candidatesInfo[id].name,
            candidateId: this.props.candidatesInfo[id].id,
        }

        this.props.letPageKnow(candidateInfo);
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <h2 className="col-12 SelectCandidate_header">Select Candidate</h2>
                    {this.props.candidatesInfo.map((candidate, i) => {
                        return <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 SelectCandidate_outerDiv" onClick={() => this.handleChosenCandidate(i)}>
                                    <div className={['SelectCandidate_card', this.state.isSelected === i ? 'active' : ''].join(' ')} onClick={() => this.handleChosenCandidate(i)}>
                                        <p onClick={() => this.handleChosenCandidate(i)}>{candidate.name}</p>
                                        <p onClick={() => this.handleChosenCandidate(i)}>{candidate.email}</p>
                                    </div>
                                </div>
                                }
                        )
                    }
                    <Link to="/create/steptwo" className="SelectCandidate_nextButton">
                        <button className="btn" disabled={this.state.isDisabled}>Next</button>
                    </Link>
                </div>
            </div>
        );
    }
}