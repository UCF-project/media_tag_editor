'use strict';

// Vendor
import React from 'react';

// APP
const LabeledSpan = (props, context) => {
	const styles = {
		label: {
			position: 'absolute',
			transform: 'perspective(1px) scale(0.75) translate3d(0px, -20px, 0px)',
			transformOrigin: 'left top 0px',
			color: context.muiTheme.palette.primary1Color
		},
		field: {minWidth: 100, display: 'inline-block', lineHeight: '20px', margin: 0, padding: '10px 9px'},
		value: {color: 'rgba(0, 0, 0, 0.5)'}
	};

	return (
		<span className={`spWrapper${props.className}`} style={styles.field} key={props.key}>
			<label className={`lb${props.className}`} style={styles.label}>{props.label}</label>
			<span className={`sp${props.className}`} style={styles.value}>{props.value}</span>
		</span>
	);
};

LabeledSpan.contextTypes = {
	muiTheme: React.PropTypes.object
};

LabeledSpan.defaultProps = {
	key: null
};

LabeledSpan.propTypes = {
	value: React.PropTypes.node,
	label: React.PropTypes.node,
	key: React.PropTypes.string,
	className: React.PropTypes.string
};

module.exports = LabeledSpan;
