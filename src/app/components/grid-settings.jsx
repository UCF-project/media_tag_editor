'use strict';

import {IconButton, Label} from 'app'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import {Popover} from 'material-ui';
import {alignment as GridAlignment, buttons} from 'app/helpers/grid'; // eslint-disable-line import/no-extraneous-dependencies
import Sortable from './sortable';

const debug = require('debug')('MTME:Components:GridSettings');

const AlignmentButton = props => {
	return (
		<IconButton
			on={props.alignment === props.type}
			off={props.alignment !== props.type}
			data-alignment-key={props.type}
			onClick={props.onClick}
			>{buttons[props.type]}</IconButton>
	);
};

AlignmentButton.propTypes = {
	alignment: React.PropTypes.string,
	type: React.PropTypes.string,
	onClick: React.PropTypes.func
};

const GridSettings = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {open: false};
	}

	handleTouchTap = e => {
		// This prevents ghost click.
		e.preventDefault();

		this.setState({
			open: true,
			anchorEl: e.currentTarget
		});
	}

	handleRequestClose = () => {
		this.setState({open: false});
	}

	handleClick = e => {
		debug('handleClick e', e, e.currentTarget.dataset.sortKey);
		debug(arguments);
		this.props.onSectionClick(e.currentTarget.dataset.sortKey);
	}

	handleSort = newOrder => {
		debug('handleSort');
		debug(newOrder);
		this.props.onSort(newOrder);
	}

	handleAlignment = e => {
		debug('handleAlignment');
		const newAlignment = e.currentTarget.dataset.alignmentKey;
		debug(newAlignment);
		this.props.onAlignment(newAlignment);
	}

	render() {
		debug('render', this.state, this.props);
		const {
			sections,
			alignment,
			onAlignment, // eslint-disable-line no-unused-vars
			onSort, // eslint-disable-line no-unused-vars
			onSectionClick, // eslint-disable-line no-unused-vars
			...others
		} = this.props;
		debug('order', sections);
		const styleLabeledSpan = {
			padding: '0px 0px 0px 15px',
			marginTop: 15
		};
		const styleIcon = {
			cursor: 'move',
			zIndex: 0
		};
		const styleInfoIcon = {
			width: 36,
			height: 36,
			fontSize: 18
		};

		const selectedCount = sections.filter(o => o.visible).length;

		const grids = [
		(
			<div key={1}>
				<AlignmentButton
					type={GridAlignment.ALIGNMENT_GRID11}
					alignment={alignment}
					onClick={this.handleAlignment}
					/>
			</div>
		),
		(
			<div key={2}>
				<AlignmentButton
					type={GridAlignment.ALIGNMENT_GRID21}
					alignment={alignment}
					onClick={this.handleAlignment}
					/>
				<AlignmentButton
					type={GridAlignment.ALIGNMENT_GRID22}
					alignment={alignment}
					onClick={this.handleAlignment}
					/>
			</div>
		),
		(
			<div key={3}>
				<AlignmentButton
					type={GridAlignment.ALIGNMENT_GRID31}
					alignment={alignment}
					onClick={this.handleAlignment}
					/>
				<AlignmentButton
					type={GridAlignment.ALIGNMENT_GRID32}
					alignment={alignment}
					onClick={this.handleAlignment}
					/>
				<AlignmentButton
					type={GridAlignment.ALIGNMENT_GRID33}
					alignment={alignment}
					onClick={this.handleAlignment}
					/>
				<AlignmentButton
					type={GridAlignment.ALIGNMENT_GRID34}
					alignment={alignment}
					onClick={this.handleAlignment}
					/>
				<AlignmentButton
					type={GridAlignment.ALIGNMENT_GRID35}
					alignment={alignment}
					onClick={this.handleAlignment}
					/>
				<AlignmentButton
					type={GridAlignment.ALIGNMENT_GRID36}
					alignment={alignment}
					onClick={this.handleAlignment}
					/>
			</div>
		)
		];

		const gridSelection = grids[selectedCount - 1];

		const btClasses = {
			Media: 'mdi mdi-burst-mode',
			Source: 'mdi mdi-code-braces',
			View: 'mdi mdi-television-guide'
		};

		const buttonSelection = sections.map(btType => {
			const btProps = {};
			if (btType.visible) {
				btProps.on = true;
			} else {
				btProps.off = true;
			}
			return (
				<IconButton
					{...btProps}
					key={btType.id}
					data-sort-key={`${btType.id}`}
					style={styleIcon}
					tooltip={btType.id}
					iconClassName={btClasses[btType.id]}
					onClick={this.handleClick}
					/>
			);
		});

		debug('buttonSelection', buttonSelection);

		return (
			<div {...others}>
				<IconButton
					secondary
					iconClassName="mdi mdi-view-grid"
					onTouchTap={this.handleTouchTap}
					/>
				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
					onRequestClose={this.handleRequestClose}
					style={{width: 288}}
					>
					<div>
						<div style={styleLabeledSpan}>
							<Label>Order & Visibility</Label>
							<IconButton style={{padding: 0, width: 18, height: 18}} iconStyle={styleInfoIcon} primary tooltip="Drag to order. Click to activate." iconClassName="mdi mdi-information"/>
						</div>
						<Sortable onSort={this.handleSort}>
							{buttonSelection}
						</Sortable>
					</div>
					<div>
						<Label style={styleLabeledSpan}>Alignment</Label>
						{gridSelection}
					</div>
				</Popover>
			</div>

		);
	}
};

GridSettings.propTypes = {
	sections: React.PropTypes.arrayOf(React.PropTypes.shape({
		id: React.PropTypes.string,
		visible: React.PropTypes.bool
	})),
	alignment: React.PropTypes.string,
	onAlignment: React.PropTypes.func,
	onSort: React.PropTypes.func,
	onSectionClick: React.PropTypes.func
};

GridSettings.defaultProps = {
	sections: [
		{id: 'Media', visible: true},
		{id: 'Source', visible: true},
		{id: 'View', visible: true}
	],
	alignment: GridSettings.ALIGNMENT_GRID36,
	onSort: () => {},
	onAlignment: () => {},
	onSectionClick: () => {}
};

GridSettings.contextTypes = {
	muiTheme: React.PropTypes.object
};

module.exports = GridSettings;
