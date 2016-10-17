'use strict';

import React from 'react';
import {FontIcon, RaisedButton} from 'material-ui';
import DialogMediaContainer from 'app/containers/dialog-media-container'; // eslint-disable-line import/no-extraneous-dependencies
import MediaBox from 'app/components/media-box'; // eslint-disable-line import/no-extraneous-dependencies

const MediaList = props => {
	const medias = props.manifestParsed.medias.map((m, i) => {
		return (<MediaBox
			key={i}
			itemIndex={i}
			media={m}
			onDelete={props.onDeleteMedia}
			onEditMedia={props.onEditMedia}
			onEditRules={props.onEditRules}
			onShow={props.onShowMedia}
			/>);
	});
	return (
		<div>
			{medias}
			<RaisedButton
				label="Add Media"
				onClick={props.onOpenNewMedia}
				secondary
				icon={<FontIcon className="mdi mdi-plus"/>}
				/>
			<DialogMediaContainer/>
		</div>
	);
};

MediaList.contextTypes = {
	muiTheme: React.PropTypes.object
};

MediaList.propTypes = {
	manifestParsed: React.PropTypes.object,
	onDeleteMedia: React.PropTypes.func,
	onEditMedia: React.PropTypes.func,
	onEditRules: React.PropTypes.func,
	onShowMedia: React.PropTypes.func,
	onOpenNewMedia: React.PropTypes.func
};

module.exports = MediaList;
