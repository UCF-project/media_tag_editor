import React from 'react';
import transitions from 'material-ui/styles/transitions';

function getStyles(props, context) {
	const {inkBar} = context.muiTheme;

	return {
		root: {
			top: props.top,
			width: 2,
			bottom: 0,
			display: 'block',
			backgroundColor: props.color || inkBar.backgroundColor,
			height: 48,
			position: 'absolute',
			transition: transitions.easeOut('1s', 'top')
		}
	};
}

const InkBar = (props, context) => {
	const {style} = props;
	const {prepareStyles} = context.muiTheme;
	const styles = getStyles(props, context);

	return (
		<div style={prepareStyles(Object.assign(styles.root, style))}/>
	);
};

InkBar.propTypes = {
	color: React.PropTypes.string,
	top: React.PropTypes.number.isRequired,
	style: React.PropTypes.object
};

InkBar.contextTypes = {
	muiTheme: React.PropTypes.object.isRequired
};

export default InkBar;
