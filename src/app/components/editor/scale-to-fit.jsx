'use strict';

import React from 'react';
import elementResizeDetectorMaker from 'element-resize-detector';

const debug = require('debug')('MTME:Containers:ScaleToFit');

const erd = elementResizeDetectorMaker({strategy: 'scroll'});

/* reference https://css-tricks.com/scaled-proportional-blocks-with-css-and-javascript/ */

class ScaleToFit extends React.Component {
	setRefInner = c => {
		this.inner = c;
	}

	setRefWrapper = c => {
		this.wrapper = c;
	}

	render() {
		return (
			<div style={{position: 'relative'}} ref={this.setRefWrapper}>
				<div style={{position: 'absolute', transformOrigin: '0 0'}} ref={this.setRefInner}>
					{this.props.children}
				</div>
			</div>
		);
	}

	componentDidMount() {
		erd.listenTo(this.wrapper, () => {
			const innerSize = {
				// Get the original size without counting transform scale
				width: this.inner.offsetWidth,
				height: this.inner.offsetHeight
			};
			const wrapperSize = this.wrapper.getBoundingClientRect();
			const scale = Math.min(wrapperSize.width / innerSize.width, 1.0);
			debug('Inner size:', innerSize);
			debug('Wrapper size', wrapperSize);
			debug(`Scale: ${scale}`);
			this.inner.style.transform = `scale(${scale})`;
			this.wrapper.style.height = `${scale * innerSize.height}px`;
		});
	}
}

ScaleToFit.propTypes = {
	children: React.PropTypes.node
};

module.exports = ScaleToFit;
