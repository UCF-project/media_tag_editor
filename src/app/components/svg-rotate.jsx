'use strict';

import React from 'react';

const SvgRotate = props => {
	const {
		rotate,
		style,
		...others
	} = props;

	let transform = '';
	if (rotate) {
		if (rotate === 90) {
			transform = 'rotate(90deg)';
		} else if (rotate === -90) {
			transform = 'rotate(-90deg)';
		} else if (rotate === 180) {
			transform = 'rotate(180deg)';
		} else {
			throw new Error(`Invalid rotate '${rotate}' type '${typeof rotate}' argument.`);
		}
	}

	const newProps = {style: Object.assign(style, {transform}), ...others};

	// React.Children.only throws if not only one child
	// which is the check we want to have here
	const svgChildIcon = React.Children.only(props.children);
	const newSvgChildIcon = React.cloneElement(svgChildIcon, newProps, svgChildIcon.props.children);
	return <div>{newSvgChildIcon}</div>;
};

SvgRotate.propTypes = {
	rotate: React.PropTypes.number,
	style: React.PropTypes.object,
	children: React.PropTypes.node
};

module.exports = SvgRotate;
