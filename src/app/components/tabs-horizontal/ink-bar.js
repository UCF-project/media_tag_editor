import React, {Component, PropTypes} from 'react';
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

class InkBar extends Component {
	static propTypes = {
		color: PropTypes.string,
		top: PropTypes.number.isRequired,
		style: PropTypes.object
	};

	static contextTypes = {
		muiTheme: PropTypes.object.isRequired
	};

	render() {
		const {style} = this.props;
		const {prepareStyles} = this.context.muiTheme;
		const styles = getStyles(this.props, this.context);

		return (
			<div style={prepareStyles(Object.assign(styles.root, style))}/>
		);
	}
}

export default InkBar;
