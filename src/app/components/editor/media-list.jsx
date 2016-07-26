'use strict';

import React from 'react';
import DialogAddMedia from 'app/components/dialog/dialog-add-media'; // eslint-disable-line import/no-extraneous-dependencies
import Divider from 'material-ui/Divider';
import MediaBox from 'app/components/editor/media-box'; // eslint-disable-line import/no-extraneous-dependencies

const MediaList = props => {
	const medias = props.manifestParsed.medias.map((m, i) => {
		return <MediaBox key={i} media={m}/>;
	});
	const styles = {
		h1: {
			margin: '5px 0px',
			fontWeight: 400,
			color: 'rgba(0,0,0,.87)'
		},
		panelRight: {
			width: '50%',
			display: 'inline-block',
			verticalAlign: 'top'
		},
		panelLeft: {
			width: '50%',
			display: 'inline-block',
			verticalAlign: 'top',
			padding: 10,
			boxSizing: 'border-box'
		},
		button: {
			marginTop: 10
		}
	};
	return (
		<div>
			{medias}
			<DialogAddMedia onInsertMedia={props.onInsertMedia}/>
		</div>
	);
};

MediaList.contextTypes = {
	muiTheme: React.PropTypes.object
};

MediaList.propTypes = {
	manifestParsed: React.PropTypes.object
};

module.exports = MediaList;
