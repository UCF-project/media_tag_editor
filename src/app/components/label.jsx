'use strict';

// Vendor
import React from 'react';

// APP
const Label = (props, context) => {
	const styleSpan = {
		color: context.muiTheme.palette.primary1Color,
		fontSize: 12
	};

	const mergedStyleSpan = Object.assign(styleSpan, props.style);

	return (
		<span style={mergedStyleSpan}>{props.children}</span>
	);
};

Label.contextTypes = {
	muiTheme: React.PropTypes.object
};

Label.propTypes = {
	children: React.PropTypes.string,
	style: React.PropTypes.object
};

Label.defaultProps = {
	style: {}
};

module.exports = Label;
