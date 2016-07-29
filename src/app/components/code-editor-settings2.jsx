'use strict';

import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

const CodeEditorSettings = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {open: false};
		this.handleTouchTap = event => {
			// This prevents ghost click.
			event.preventDefault();

			this.setState({
				open: true,
				anchorEl: event.currentTarget
			});
		};

		this.handleRequestClose = () => {
			this.setState({
				open: false
			});
		};
	}

	render() {
		return (
			<div style={{position: 'absolute', right: 0, zIndex: 100}}>
				<IconButton iconClassName="mdi mdi-settings" onClick={this.handleTouchTap}/>
				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestClose}
					>
					<Menu>
						<MenuItem primaryText="Refresh"/>
						<MenuItem primaryText="Help &amp; feedback"/>
						<MenuItem primaryText="Settings"/>
						<MenuItem primaryText="Sign out"/>
					</Menu>
				</Popover>
			</div>
		);
	}
};

module.exports = CodeEditorSettings;
