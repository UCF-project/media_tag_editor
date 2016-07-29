'use strict';

import {Dropzone, json2str, MediaStore, MediaActions, StorageActions, Tabs, Tab} from 'app';
import React from 'react';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

const debug = require('debug')('MTME:Containers:MediaContentContainer');

class MediaContentContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = MediaStore.getInitialState();
	}

	handleDrop() {
		StorageActions.drop(...arguments);
	}

	handleDropAccepted(files) {
		debug('a', arguments);
		const body = new FormData();
		body.append('file', files[0]);
		StorageActions.dropAccept({body});
	}

	handleDropRejected() {
		debug('r', arguments);
		StorageActions.dropReject(...arguments);
	}

	handleDragEnter() {
		debug('er', arguments);
		StorageActions.dragEnter();
	}

	handleDragLeave() {
		debug('lr', arguments);
		StorageActions.dragLeave();
	}

	handleChange = () => {
		debug('handleChange', arguments);
		debug('updateContent', this.urlInput.getValue());
		debug('MediaActions', MediaActions);
		MediaActions.updateContent(this.urlInput.getValue());
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	setRef = c => {
		this.urlInput = c;
	}

	componentDidMount() {
		debug('componentDidMount');
		this.unsubscribe = MediaStore.listen(this.handleStateChange);
		MediaActions.stateCast();
	}

	componentWillUnmount() {
		debug('componentWillUnmount');
		this.unsubscribe();
	}

	render() {
		const styles = {
			tab: {padding: '10px 20px'}
		};
		let contentObject = '';
		let contentString = '';
		if (typeof this.state.media.content === 'object') {
			contentObject = json2str(this.state.media.content);
		} else if (typeof this.state.media.content === 'string') {
			contentString = this.state.media.content;
		}
		const styleDropzone = {
			width: '100%',
			height: 120,
			border: '2px dashed rgb(212, 212, 212)',
			borderRadius: 5,
			color: '#939393',
			fontWeight: 'lighter',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		};
		return (
			<Tabs value={this.state.media.dialog.contentTabIndex}>
				<Tab icon={<FontIcon className="mdi mdi-link"/>} label="URL" value={0}>
					<div style={styles.tab}>
						<TextField
							ref={this.setRef}
							floatingLabelText="URL"
							floatingLabelFixed
							style={{width: '100%'}}
							onChange={this.handleChange}
							value={contentString}
							/>
					</div>
				</Tab>
				<Tab icon={<FontIcon className="mdi mdi-upload"/>} label="Upload" value={1}>
					<div style={styles.tab}>
						<Dropzone
							onDrop={this.handleDrop}
							onDropAccepted={this.handleDropAccepted}
							onDropRejected={this.handleDropRejected}
							onDragEnter={this.handleDragEnter}
							onDragLeave={this.handleDragLeave}
							style={styleDropzone}
							>
						Click here or drag your file
						</Dropzone>
					</div>
				</Tab>
				<Tab icon={<FontIcon className="mdi mdi-code-braces"/>} label="Object" value={2}>
					<div style={styles.tab}>
						<TextField
							multiline
							rows={4}
							ref={this.setRef}
							floatingLabelText="Object"
							floatingLabelFixed
							style={{width: '100%'}}
							onChange={this.handleChange}
							value={contentObject}
							/>
					</div>
				</Tab>
			</Tabs>
		);
	}
}

module.exports = MediaContentContainer;
