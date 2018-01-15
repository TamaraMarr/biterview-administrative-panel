import React from "react";

import "./Header.css";

const Search = props => {
	const reloadPage = () => {
		document.location.reload();
	};

	return (
		<div className="Header_mainStyle">
			<nav className="flex-wrapper">
				<h1 className="Header_title" onClick={reloadPage}>
					Biterview Administrative Panel
				</h1>
				<div>
					<input type="button" value="Reports" className="btn btn-danger Header_buttons" />
					<input type="button" value="Create Report" className="btn btn-danger Header_buttons" />
				</div>
			</nav>
		</div>
	);
};

export default Search;
