'use strict';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Step, StepButton, Stepper} from 'material-ui/Stepper';
import MediaContentContainer from 'app/containers/media-content';
import MediaRulesContainer from 'app/containers/media-rules';
import MediaConfirmContainer from 'app/containers/media-confirm';

const DialogAddMedia = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			stepIndex: 0
		};

		this.handleOpen = () => {
			this.setState({open: true, stepIndex: 0});
		};

		this.handleClose = () => {
			this.setState({open: false});
		};

		this.handleNext = () => {
			this.setState({stepIndex: this.state.stepIndex + 1});
		};
	}

	render() {
		const actions = [
			<FlatButton
				label={this.state.stepIndex === 2 ? 'Save' : 'Next'}
				primary
				onClick={this.handleNext}
				key={0}
				/>,
			<FlatButton
				label="Cancel"
				primary
				onClick={this.handleClose}
				key={1}
				/>
		];

		return (
			<div>
				<RaisedButton
					label="Add Media"
					onClick={this.handleOpen}
					secondary
					style={{marginTop: 10}}
					icon={<FontIcon className="mdi mdi-plus"/>}
					/>
				<Dialog
					title="Add Media"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
					>
					<Stepper linear={false} activeStep={this.state.stepIndex}>
						<Step>
							<StepButton onClick={() => this.setState({stepIndex: 0})}>
								Select media
							</StepButton>
						</Step>
						<Step>
							<StepButton onClick={() => this.setState({stepIndex: 1})}>
								Create rules
							</StepButton>
						</Step>
						<Step>
							<StepButton onClick={() => this.setState({stepIndex: 2})}>
								Confirm media
							</StepButton>
						</Step>
					</Stepper>
					{this.state.stepIndex === 0 && (
						<MediaContentContainer/>
					)}
					{this.state.stepIndex === 1 && (
						<MediaRulesContainer editable/>
					)}
					{this.state.stepIndex === 2 && (
						<MediaConfirmContainer/>
					)}
				</Dialog>
			</div>
		);
	}
};

module.exports = DialogAddMedia;
