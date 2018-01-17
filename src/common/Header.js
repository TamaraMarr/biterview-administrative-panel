import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = props => {
	const reloadPage = () => {
		document.location.reload();
	};

	return (
		<div className="Header_mainStyle">
			<nav className="flex-wrapper">
				<Link to="/reports">
					<h1 className="Header_title" onClick={reloadPage}>
						Biterview Administrative Panel
					</h1>
				</Link>
				<div>
					<Link to="/create">
						<input type="button" value="Create Report" className="btn btn-danger Header_buttons" />
					</Link>
					<Link to="/reports">
						<input type="button" value="Reports" className="btn btn-danger Header_buttons" />
					</Link>
				</div>
			</nav>
		</div>
	);
};

export default Header;
