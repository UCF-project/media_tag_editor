'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';

const DialogAddMedia = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};

		this.handleOpen = () => {
			this.setState({open: true});
		};

		this.handleClose = () => {
			this.setState({open: false});
		};
	}

	render() {
		const styles = {
			headline: {
				fontSize: 24,
				paddingTop: 16,
				marginBottom: 12,
				fontWeight: 400
			}
		};

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
					label="Add Media"
					onClick={this.handleOpen}
					secondary
					style={{paddingTop: 10}}
					icon={<FontIcon className="mdi mdi-plus"/>}
					/>
				<Dialog
					title="Add Media"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
					>
					<Tabs>
						<Tab label="URL">
							<div>
								<TextField
									floatingLabelText="URL"
									floatingLabelFixed
									/>
							</div>
						</Tab>
						<Tab label="XWiki">
							<div>
								<p>
									This is another example tab.
								</p>
							</div>
						</Tab>
						<Tab label="MT Media Server">
							<div>
								<p>
									This is a third example tab.
								</p>
							</div>
						</Tab>
					</Tabs>
				</Dialog>
			</div>
		);
	}
};

module.exports = DialogAddMedia;
