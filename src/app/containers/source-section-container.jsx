'use strict';

import React from 'react';
import CodeEditor from 'app/components/code-editor'; // eslint-disable-line import/no-extraneous-dependencies
import ManifestStore from 'app/stores/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import ManifestActions from 'app/actions/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import FlatButton from 'material-ui/FlatButton';
import {debounce} from 'lodash';

const debug = require('debug')('MTME:Containers:GridContentContainer');

const debouncedSourceChange = debounce((type, newValue) => {
	ManifestActions.changeSource(type, newValue);
}, 1000);

class SourceSectionContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	handleCodeChange = newValue => {
		debug('handleChange', newValue);
		debouncedSourceChange(this.state.manifest.type, newValue);
	}

	handleClickFile = e => {
		debug('handleChange', e, e.currentTarget, e.currentTarget.dataset);
		const newFileType = e.currentTarget.dataset.fileType;
		ManifestActions.changeFile(newFileType);
	}

	componentDidMount() {
		this.unsubscribe = [];
		this.unsubscribe.push(ManifestStore.listen(this.handleStateChange));
		ManifestActions.changeToTemplateIndex(0);
	}

	componentWillUnmount() {
		this.unsubscribe.forEach(fn => fn());
	}

	render() {
		const fileBts = this.state.manifest ? this.state.manifest.files.map(f => <FlatButton data-file-type={f.type} key={f.type} label={f.filename} primary disabled={f.type === this.state.manifest.type} onClick={this.handleClickFile}/>) : null;
		return (
			<div key="Source" style={{height: '100%', width: '100%'}}>
				{this.state.manifest && (
					<div style={{position: 'relative', height: '100%', width: '100%'}}>
						<CodeEditor
							name={this.state.manifest.type}
							mode={this.state.manifest.mode}
							onChange={this.handleCodeChange}
							value={this.state.manifest.source}
							/>
						<div style={{position: 'absolute', bottom: 15, right: 15}}>
							{fileBts}
						</div>
					</div>
				)}
			</div>
		);
	}
}

module.exports = SourceSectionContainer;
