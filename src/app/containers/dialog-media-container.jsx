'use strict';

import {MediaContentContainer, MediaRulesContainer, MediaConfirmContainer, MediaStore, MediaActions} from 'app';
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

			if (this.state.media.dialog.stepIndex === 2) {
				actions.push(<FlatButton
					label="Save"
					primary
					onClick={this.handleSave}
					key={0}
					/>);
			} else {
				actions.push(<FlatButton
					label="Next"
					primary
					onClick={this.handleNext}
					key={0}
					/>);
			}

			actions.push(<FlatButton
				label="Cancel"
				primary
				onClick={this.handleClose}
				key={1}
				/>);

			return (
				<Dialog
					title="Add Media"
					actions={actions}
					modal={false}
					open={this.state.media.dialog.open}
					onRequestClose={this.handleClose}
					>
					<Stepper linear={false} activeStep={this.state.media.dialog.stepIndex}>
						<Step>
							<StepButton onClick={this.handleStep1}>Select media</StepButton>
						</Step>
						<Step>
							<StepButton onClick={this.handleStep2}>Create rules</StepButton>
						</Step>
						<Step>
							<StepButton onClick={this.handleStep3}>Confirm media</StepButton>
						</Step>
					</Stepper>
					{this.state.media.dialog.stepIndex === 0 && (
						<MediaContentContainer/>
					)}
					{this.state.media.dialog.stepIndex === 1 && (
						<MediaRulesContainer editable/>
					)}
					{this.state.media.dialog.stepIndex === 2 && (
						<MediaConfirmContainer/>
					)}
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
module.exports = DialogMediaContainer;
