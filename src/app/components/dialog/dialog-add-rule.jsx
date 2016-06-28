'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const contentTypes = [
	<MenuItem key={1} value={1} primaryText="Image"/>,
	<MenuItem key={2} value={2} primaryText="Video"/>,
	<MenuItem key={3} value={3} primaryText="3D"/>,
	<MenuItem key={4} value={4} primaryText="oEmbed"/>
];

const monitors = [
	<MenuItem key={1} value={1} primaryText="network"/>,
	<MenuItem key={2} value={2} primaryText="fixed"/>,
	<MenuItem key={3} value={3} primaryText="resize"/>
];

const DialogAddRule = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			value: 1
		};

		this.handleOpen = () => {
			this.setState({open: true});
		};

		this.handleClose = () => {
			this.setState({open: false});
		};

		this.handleChange = () => {
			this.setState({open: false});
		};
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary
				onClick={this.handleClose}
				key={1}
				/>,
			<FlatButton
				label="Save"
				primary
				keyboardFocused
				onClick={this.handleClose}
				key={2}
				/>
		];

		return (
			<div>
				<RaisedButton
					label="Add Rule"
					onClick={this.handleOpen}
					secondary
					style={{paddingTop: 10}}
					icon={<FontIcon className="mdi mdi-plus"/>}
					/>
				<Dialog
					title="Add Rule"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
					>

					<SelectField
						floatingLabelFixed
						floatingLabelText="content type"
						value={1}
						>
						{contentTypes}
					</SelectField>

					<SelectField
						floatingLabelFixed
						floatingLabelText="monitor"
						value={1}
						>
						{monitors}
					</SelectField>

				</Dialog>
			</div>
		);
	}
};

module.exports = DialogAddRule;
