'use strict';

import React from 'react';
import {FontIcon, Paper} from 'material-ui';

const ParserErrorBox = (props, context) => {
	const {
		error,
		style,
		...others
	} = props;
	return (
		<Paper style={Object.assign({padding: '10px 20px'}, style)} {...others}>
			<FontIcon style={{marginRight: 15}} color={context.muiTheme.palette.errorColor} className="mdi mdi-alert"/>
			<p style={{display: 'inline-block', color: context.muiTheme.palette.errorColor}}>{error.name}: {error.message}</p>
		</Paper>
	);
};

ParserErrorBox.contextTypes = {
	muiTheme: React.PropTypes.object
};

ParserErrorBox.propTypes = {
	error: React.PropTypes.object.required,
	style: React.PropTypes.object
};

module.exports = ParserErrorBox;
