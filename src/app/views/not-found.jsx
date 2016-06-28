'use strict';

// Vendor
import React from 'react';

const NotFound = class extends React.Component {

	render() {
		return (
			<h1>404 Page not found.</h1>
		);
	}

};

NotFound.contextTypes = {
	router: React.PropTypes.object,
	muiTheme: React.PropTypes.object
};

module.exports = NotFound;
