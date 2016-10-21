'use strict';

import React from 'react';
// import MediaTagWrapper from 'app/components/media-tag-wrapper'; // eslint-disable-line import/no-extraneous-dependencies
import ManifestStore from 'app/stores/manifest'; // eslint-disable-line import/no-extraneous-dependencies
import ManifestActions from 'app/actions/manifest'; // eslint-disable-line import/no-extraneous-dependencies

// const debug = require('debug')('MTME:Containers:ViewContentContainer');

class ViewSectionContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	componentDidMount() {
		this.unsubscribe = [];
		this.unsubscribe.push(ManifestStore.listen(this.handleStateChange));
		ManifestActions.stateCast();
	}

	componentWillUnmount() {
		this.unsubscribe.forEach(fn => fn());
	}

	render() {
		const styleIframe = {
			height: '99%',
			width: '100%',
			padding: 0,
			margin: 0,
			boxSizing: 'border-box',
			border: 0
		};
		// return (
		// 	<div key="View" style={{height: '100%', width: '100%', overflow: 'auto'}}>
		// 		{this.state.manifest && <MediaTagWrapper src={this.state.manifest.url}/>}
		// 	</div>
		// );
		return (
			<div key="View" style={{height: '100%', width: '100%', overflow: 'auto'}}>
				{this.state.manifest && this.state.manifest.status === 'PARSED' && !window.myHappyGlobalisDragActive && (
					<iframe srcDoc={this.state.manifest.htmlSourceDoc} style={styleIframe}>
						<p>Your browser does not support iframes.</p>
					</iframe>
				)}
			</div>
		);
// 		return (
// 			<div key="Source" style={{height: '100%', width: '100%'}}>

// 			<iframe src="https://mdn-samples.mozilla.org/snippets/html/iframe-simple-contents.html" width="400" height="300">
//   <p>Your browser does not support iframes.</p>
// </iframe>

// 				{this.state.manifest && (
// 					<div style={{position: 'relative', height: '100%', width: '100%'}}>
// 						<CodeEditor
// 							name={this.state.manifest.type}
// 							mode={this.state.manifest.mode}
// 							onChange={this.handleCodeChange}
// 							value={this.state.manifest.source}
// 							/>
// 						<div style={{position: 'absolute', bottom: 15, right: 15}}>
// 							{fileBts}
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		);
	}
}

// ViewSectionContainer.contextTypes = {
// 	isDragActive: React.PropTypes.bool
// };

module.exports = ViewSectionContainer;
