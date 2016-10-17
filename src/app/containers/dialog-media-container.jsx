'use strict';

import {MediaContentContainer, MediaRulesContainer, MediaConfirmContainer, MediaStore, MediaActions} from 'app'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import {Dialog, FlatButton, Step, StepButton, Stepper} from 'material-ui';

const debug = require('debug')('MTME:Containers:DialogMediaContainer');

class DialogMediaContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = MediaStore.getInitialState();
	}

	handleGotoStep(stepIndex) {
		MediaActions.gotoStep(stepIndex);
	}

	handleStep1 = () => {
		this.handleGotoStep(0);
	}

	handleStep2 = () => {
		this.handleGotoStep(1);
	}

	handleStep3 = () => {
		this.handleGotoStep(2);
	}

	handleSave() {
		MediaActions.save();
	}

	handleNext() {
		MediaActions.nextStep();
	}

	handleClose() {
		MediaActions.close();
	}

	render() {
		debug('render', this.state);

		if (this.state && this.state.media && this.state.media.dialog) {
			const actions = [];

			actions.push(<FlatButton
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
