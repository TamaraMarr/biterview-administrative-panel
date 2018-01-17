import React from "react";

import "./SelectCandidate.css";

export default class SelectCandidate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            bgColor: "",
            isSelected: ""
        }

        this.bindInit();
    }

    bindInit() {
        this.handleChosenCandidate = this.handleChosenCandidate.bind(this);
    }

    handleChosenCandidate(id) {
        this.setState({
            isSelected: id
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
                        return <div key={i} className="col-6 SelectCandidate_outerDiv" onClick={() => this.handleChosenCandidate(i)}>
                                    <div className={['SelectCandidate_card', this.state.isSelected === i ? 'active' : ''].join(' ')} onClick={() => this.handleChosenCandidate(i)}>
                                        <p onClick={() => this.handleChosenCandidate(i)}>{candidate.name}</p>
                                        <p onClick={() => this.handleChosenCandidate(i)}>{candidate.email}</p>
                                    </div>
                                </div>
                                })
                    }
                {this.props.noCandidateNameError ? <p className="error">Please select a candidate</p> : ""}
                </div>
            </div>
        );
    }
}