import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = props => {
	const reloadPage = () => {
		document.location.reload();
	};

	return (
		<div className="container-fluid Header_mainStyle">
			<div className="row">
				<div className="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-5">
					<Link to="/reports">
						<h1 className="Header_title" onClick={reloadPage}>
							Biterview Administrative Panel
						</h1>
					</Link>
				</div>
				<div className="col-12 col-sm-5 col-md-6 offset-lg-2 col-lg-5 offset-xl-3 col-xl-4" style={{ textAlign: "center" }}>
					<Link to="/create">
						<input type="button" value="Create Report" className="col-5 btn btn-danger Header_buttons" />
					</Link>
					<Link to="/reports">
						<input type="button" value="Reports" className="col-5 btn btn-danger Header_buttons" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
