'use strict';

import React from 'react';

const debug = require('debug')('MTME:Components:GridBox');

class GridBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleDragStart = e => {
		e.nativeEvent.dataTransfer.clearData();
		e.nativeEvent.dataTransfer.effectAllowed = 'move';

		// e.nativeEvent.dataTransfer.setData('text/plain', 'test');
		// e.nativeEvent.dataTransfer.setData('text/html', '<div/>');

		debug('handleDragStart', e);
	}

	handleDrag = e => {
		if (e.pageX) {
			const totalWidth = document.body.scrollWidth;
			// TODO: change to detect total height without appbar
			const totalHeight = (document.body.scrollHeight - 64);
			// debug('handleDrag');
			// TODO: change to detect total height without appbar
			const percentage = Math.round(this.props.columns ? e.pageX / totalWidth * 100 : (e.pageY - 64) / totalHeight * 100);
			const sizingIndex = parseInt(e.currentTarget.dataset.sizingIndex, 10);
			const newSizes = this.state.sizes.slice(0);
			const previousSum = newSizes.slice(0, sizingIndex).reduce((p, c) => {
				return p + c;
			}, 0);
			const difference = previousSum - percentage;
			// debug('sizingIndex', sizingIndex, 'percentage', percentage, 'previousSum', previousSum, 'difference', difference);
			newSizes[sizingIndex - 1] -= difference;
			newSizes[sizingIndex] += difference;
			this.setState({sizes: newSizes});
		}
	}

	handleDragEnd = e => {
		debug('handleDragEnd', e);
	}

	calculateSizes = props => {
		debug('calculateSizes');
		const totalItems = props.sections.length;
		const sizeEach = parseInt(100 / totalItems, 10);
		this.setState({sizes: Array(totalItems).fill(sizeEach)});
	}

	componentWillMount() {
		debug('componentWillMount', this.props);
		this.calculateSizes(this.props);
	}

	componentWillReceiveProps(nextProps) {
		debug('componentWillReceiveProps', this.props, nextProps);
		if ((nextProps.sections.length !== this.props.sections.length) ||
			(nextProps.columns !== this.props.columns) ||
			(nextProps.rows !== this.props.rows)) {
			this.calculateSizes(nextProps);
		}
	}

	// TODO: maybe improve render speed with shouldComponentUpdate

	render() {
		debug('render', 'state', this.state);
		const resizeBarSize = 5;
		let styleResizeBar = {
			backgroundColor: this.context.muiTheme.palette.primary1Color,
			boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
		};
		const {
			columns,
			rows,
			sections,
			style,
			...others
		} = this.props;

		const totalItems = sections.length;

		if (columns && rows) {
			throw new Error('Please select only one property for GridBox, either columns or rows.');
		}

		if (!columns && !rows) {
			throw new Error('Please select at least one property for GridBox, either columns or rows.');
		}

		let styleWrapper = {width: '100%', height: '100%', position: 'relative'};
		let styleSection = {position: 'relative'};

		if (columns) {
			styleWrapper = Object.assign(styleWrapper, {display: 'flex'});
			styleSection = Object.assign(styleSection, {verticalAlign: 'top'});
			styleResizeBar = Object.assign(styleResizeBar, {width: resizeBarSize, cursor: 'col-resize'});
		} else {
			styleResizeBar = Object.assign(styleResizeBar, {height: resizeBarSize, cursor: 'row-resize'});
		}

		const barPixels = Math.ceil(resizeBarSize * (totalItems - 1) / totalItems);
		const barPixelsText = barPixels ? ` - ${barPixels}px` : '';

		const renderedSections = sections.map((s, i) => {
			const styleSectionI = columns ? {width: `calc(${this.state.sizes[i]}%${barPixelsText})`} : {height: `calc(${this.state.sizes[i]}%${barPixelsText})`};
			const styleSectionITotal = Object.assign({}, styleSection, styleSectionI);
			const result = [];
			if (i) {
				result.push((
					<div
						draggable
						style={styleResizeBar}
						onDragStart={this.handleDragStart}
						onDragEnd={this.handleDragEnd}
						onDrag={this.handleDrag}
						data-sizing-index={i}
						/>
				));
			}
			result.push(<div style={styleSectionITotal} key={i}>{s}</div>);
			return result;
		});

		return (
			<div style={Object.assign(style || {}, styleWrapper)} {...others}>
				{renderedSections}
			</div>
		);
	}
}

GridBox.contextTypes = {
	muiTheme: React.PropTypes.object
};

GridBox.propTypes = {
	columns: React.PropTypes.bool,
	rows: React.PropTypes.bool,
	sections: React.PropTypes.array,
	style: React.PropTypes.object
};

module.exports = GridBox;
