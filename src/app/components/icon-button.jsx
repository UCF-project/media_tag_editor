'use strict';

import React from 'react';
import {IconButton} from 'material-ui';

const IconButtonApp = (props, context) => {
	const {
		primary,
		secondary,
		iconStyle,
		...others
	} = props;
	let calcIconStyle = {};
	if (primary && secondary) {
		throw new Error('Please define only one property, either primary or secondary');
	}
	if (primary) {
		calcIconStyle = {color: context.muiTheme.palette.primary1Color};
	}
	if (secondary) {
		calcIconStyle = {color: context.muiTheme.palette.accent1Color};
	}
	return (
		<IconButton iconStyle={Object.assign(calcIconStyle, iconStyle)} {...others}/>
	);
};

IconButtonApp.contextTypes = {
	muiTheme: React.PropTypes.object
};

IconButtonApp.propTypes = {
	primary: React.PropTypes.bool,
	secondary: React.PropTypes.bool,
	iconStyle: React.PropTypes.object
};

module.exports = IconButtonApp;
