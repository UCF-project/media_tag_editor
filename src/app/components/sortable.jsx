/*
Inspired from https://github.com/jasonslyvia/react-anything-sortable
 */
'use strict';

import React from 'react';

const debug = require('debug')('MTME:Components:Sortable');

const control = {
	lastOver: null,
	lastChangeCounter: null
};

const Sortable = class extends React.Component {
	constructor(props) {
		debug('constructor');
		super(props);
		this.state = {
			isDragActive: -1,
			changeCounter: 0
		};
	}

	getKeyPosition = sortKey => {
		return this.state.order.indexOf(sortKey);
	}

	getDOMSortKey = target => {
		return target.dataset[Sortable.propSortNameCC];
	}

	handleDragStart = e => {
		const sortKey = this.getDOMSortKey(e.currentTarget);
		debug('handleDragStart', sortKey, e);
		this.setState({
			isDragActive: sortKey
		});
	}

	handleDragEnd = e => {
		const sortKey = this.getDOMSortKey(e.currentTarget);
		debug('handleDragEnd', sortKey, e);
		this.setState({
			isDragActive: -1
		});
		this.props.onSort(this.state.order);
	}

	handleDragOver = e => {
		const sortKey = this.getDOMSortKey(e.currentTarget);
		if (control.lastOver !== sortKey &&
			control.lastChangeCounter !== this.state.changeCounter) {
			// Avoid multiple calls on the same object over
			control.lastOver = sortKey;
			control.lastChangeCounter = this.state.changeCounter;

			const overKeyPosition = this.getKeyPosition(sortKey);
			const currentKeyPosition = this.getKeyPosition(this.state.isDragActive);
			const newOrder = this.state.order.slice(0);
			newOrder.splice(currentKeyPosition, 1);
			newOrder.splice(overKeyPosition, 0, this.state.isDragActive);

			debug('newOrder', newOrder);
			this.setState({order: newOrder, changeCounter: this.state.changeCounter + 1});
		}
	}

	componentWillMount = () => {
		debug('componentWillReceiveProps');
		// if (this.children !== nextProps.children) {
		const newOrder = React.Children.map(this.props.children, child => {
			return child.props[Sortable.propSortName];
		});
		this.setState({order: newOrder});
		// }
	}

	renderChildrenInOrder = () => {
		if (this.state.order && this.state.order.length) {
			const keyToChild = {};
			const extraProps = {
				draggable: true,
				onDragStart: this.handleDragStart,
				onDragEnd: this.handleDragEnd,
				onDragOver: this.handleDragOver
			};
			React.Children.forEach(this.props.children, child => {
				keyToChild[child.props[Sortable.propSortName]] = React.cloneElement(child, extraProps);
			});
			return this.state.order.map(sortKey => {
				return keyToChild[sortKey];
			});
		}
		return null;
	}

	render() {
		debug('render');
		debug('state', this.state);
		const {
			onSort, // eslint-disable-line no-unused-vars
			children, // eslint-disable-line no-unused-vars
			...others
		} = this.props;
		debug('children', children);

		const renderedChildren = this.renderChildrenInOrder();
		debug('renderedChildren', renderedChildren);
		return (
			<div {...others}>
			{renderedChildren}
			</div>
		);
	}
};

Sortable.propSortName = 'data-sort-key';
Sortable.propSortNameCC = 'sortKey'; // camelcased

Sortable.propTypes = {
	children: React.PropTypes.node,
	onSort: React.PropTypes.func
};

module.exports = Sortable;
