'use strict';

import {Tabs, Tab, MediaStore, MediaActions} from 'app';
import React from 'react';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

const debug = require('debug')('MTME:Containers:MediaContentContainer');

class MediaContentContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = MediaStore.getInitialState();
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
		return (
			<Tabs>
				<Tab icon={<FontIcon className="mdi mdi-link"/>} label="URL">
					<div style={styles.tab}>
						<TextField
							ref={this.setRef}
							floatingLabelText="URL"
							floatingLabelFixed
							style={{width: '100%'}}
							onChange={this.handleChange}
							value={this.state.media.content}
							/>
					</div>
				</Tab>
				<Tab icon={<FontIcon className="mdi mdi-upload"/>} label="Upload">
					<div style={styles.tab}>
						<p>
							Select a file to upload to Media Tag Media Server
						</p>
					</div>
				</Tab>
			</Tabs>
		);
	}
}

module.exports = MediaContentContainer;
