'use strict';

import {SelectInput} from 'app'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import RaisedButton from 'material-ui/RaisedButton';
// import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import SelectField from 'material-ui/SelectField';
// import Menu from 'material-ui/Menu';
// import MenuItem from 'material-ui/MenuItem';

const debug = require('debug')('MTME:Components:MediaRules');

const rulesProps = ['monitor', 'state', 'action', 'flag'];

const monitors = ['network', 'fake', 'resize'];

// const states = {
// 	network: ['up', 'down'],
// 	fake: ['value1', 'value2', 'value3', 'value4', 'value5'],
// 	resize: ['desktop', 'mobile']
// };

const actions = ['visibility', 'style'];

// const flags = {
// 	visibility: [true, false],
// 	style: []
// };

// const convert2MenuItem = (v, i) => <MenuItem key={i} value={v} primaryText={v}/>;

// const menus = {
// 	monitor: <Menu>{monitors.map(convert2MenuItem)}</Menu>,
// 	state: <Menu>{monitors.map(convert2MenuItem)}</Menu>,
// 	action: <Menu>{actions.map(convert2MenuItem)}</Menu>,
// 	flag: <Menu>{monitors.map(convert2MenuItem)}</Menu>
// };

const menus = {
	monitor: monitors,
	state: monitors,
	action: actions,
	flag: monitors
};

// <SelectField
// 	floatingLabelFixed
// 	floatingLabelText="content type"
// 	value={r[rp]}
// 	>
// 	{monitors}
// </SelectField>

const MediaRules = (props, context) => {
	const {
		rules,
		editable,
		onInsertRule,
		onSaveRule,
		onEditRule,
		onDeleteRule,
		...others
	} = props;
	const styles = {
		icon: {color: context.muiTheme.palette.accent1Color},
		input: {
			width: '100%',
			paddingRight: 20,
			boxSizing: 'border-box'
		},
		iconBtInput: {
			position: 'absolute',
			right: 6
		},
		iconIcInput: {color: 'rgb(224, 224, 224)'}
	};
	debug('MediaRules render');
	let renderedRules;

	if (rules && rules.length) {
		renderedRules = rules.map((r, i) => {
			let buttons;
			if (editable && r.editting) {
				buttons = (
					<TableRowColumn key={i} style={{overflow: 'visible'}}>
						<IconButton data-item-index={i} onClick={onSaveRule} iconStyle={styles.icon} iconClassName="mdi mdi-check" tooltip="Save"/>
					</TableRowColumn>
				);
			} else if (editable) {
				buttons = (
					<TableRowColumn key={i} style={{overflow: 'visible'}}>
						<IconButton data-item-index={i} onClick={onEditRule} iconStyle={styles.icon} iconClassName="mdi mdi-pencil" tooltip="Edit"/>
						<IconButton data-item-index={i} onClick={onDeleteRule} iconStyle={styles.icon} iconClassName="mdi mdi-delete" tooltip="Delete"/>
					</TableRowColumn>
				);
			}
			return (
				<TableRow key={i} selectable={false}>
					{rulesProps.map((rp, rpi) => {
						if (editable && r.editting) {
							return (
								<TableRowColumn key={rpi} style={{position: 'relative'}}>
									<SelectInput inputStyle={{fontSize: 13}} value={String(r[rp])} name={`${rp}_${i}`} menu={menus[rp]}/>
								</TableRowColumn>
							);
						}
						return <TableRowColumn key={rpi}>{String(r[rp])}</TableRowColumn>;
					})}
					{editable && buttons}
				</TableRow>
			);
		});
	} else {
		renderedRules = !editable && (
			<TableRow selectable={false}><TableRowColumn>No rules</TableRowColumn></TableRow>
		);
	}
	return (
		<Table selectable={false} {...others}>
			<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
				<TableRow selectable={false}>
					<TableHeaderColumn>Monitor</TableHeaderColumn>
					<TableHeaderColumn>State</TableHeaderColumn>
					<TableHeaderColumn>Action</TableHeaderColumn>
					<TableHeaderColumn>Flag</TableHeaderColumn>
					{editable && <TableHeaderColumn/>}
				</TableRow>
			</TableHeader>
			<TableBody displayRowCheckbox={false}>
			{renderedRules}
			</TableBody>
			{editable && (
				<TableFooter>
					<TableRow selectable={false}>
						<TableRowColumn style={{overflow: 'visible'}}>
							<IconButton
								style={{marginLeft: -85}}
								iconStyle={styles.icon}
								iconClassName="mdi mdi-plus"
								tooltipPosition="top-center"
								tooltip="New rule"
								onClick={onInsertRule}
								/>
						</TableRowColumn>
					</TableRow>
				</TableFooter>
			)}
		</Table>
	);
};

MediaRules.contextTypes = {
	muiTheme: React.PropTypes.object
};

MediaRules.propTypes = {
	rules: React.PropTypes.array,
	editable: React.PropTypes.bool,
	onInsertRule: React.PropTypes.func,
	onSaveRule: React.PropTypes.func,
	onDeleteRule: React.PropTypes.func,
	onEditRule: React.PropTypes.func
};

module.exports = MediaRules;
