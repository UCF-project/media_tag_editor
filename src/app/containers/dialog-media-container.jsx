'use strict';

import {MediaContentContainer, MediaStore, MediaActions} from 'app'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import {Dialog, FlatButton, RaisedButton} from 'material-ui';

const debug = require('debug')('MTME:Containers:DialogMediaContainer');

class DialogMediaContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = MediaStore.getInitialState();
	}

	handleSave() {
		MediaActions.save();
	}

	handleClose() {
		MediaActions.close();
	}

	render() {
		debug('render', this.state);

		if (this.state && this.state.media && this.state.media.dialog) {
			const actions = [];

			actions.push(<RaisedButton
				label="Save"
				primary
				onClick={this.handleSave}
				key={0}
				/>);

			actions.push(<FlatButton
				label="Cancel"
				primary
				onClick={this.handleClose}
				key={1}
				/>);

			return (
				<Dialog
					title={this.state.media.dialog.type === 'NEW' ? 'Add Media' : 'Edit Media'}
					actions={actions}
					modal={false}
					open={this.state.media.dialog.open}
					onRequestClose={this.handleClose}
					>
					<MediaContentContainer/>
				</Dialog>);
		}
		return <div/>;
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	componentDidMount() {
		this.unsubscribe = MediaStore.listen(this.handleStateChange);
		MediaActions.stateCast();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
}

module.exports = DialogMediaContainer;
