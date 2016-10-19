import image from './image.tpl.json';
import imageObjJson from './image-obj.tpl.json';
import dash from './dash.tpl.json';

import videoJson from './video.tpl.json';
import videoHtml from './video.tpl.html';

import video3dJson from './video3d.tpl.json';
import video3dHtml from './video3d.tpl.html';

import oembedJson from './oembed.tpl.json';
import oembedHtml from './oembed.tpl.html';

import stylingInlineJson from './styling-inline.tpl.json';
import stylingInlineHtml from './styling-inline.tpl.html';

import stylingExternalJson from './styling-external.tpl.json';
import stylingExternalHtml from './styling-external.tpl.html';

import stylingDivJson from './styling-div.tpl.json';
import stylingDivHtml from './styling-div.tpl.html';

import defaultHtml from './default.tpl.html';

// TODO: this should be replace/merged with examples
module.exports = {
	manifests: [{
		label: 'image',
		json: image,
		html: defaultHtml
	}, {
		label: 'image object',
		json: imageObjJson,
		html: defaultHtml
	}, {
		label: 'DASH video, image, HTML',
		json: dash,
		html: defaultHtml
	}, {
		label: 'Video, audio, image, HTML',
		json: videoJson,
		html: videoHtml
	}, {
		label: '3D, video, audio, image, text',
		json: video3dJson,
		html: video3dHtml
	}, {
		label: 'oEmbed',
		json: oembedJson,
		html: oembedHtml
	}, {
		label: 'styling inline',
		json: stylingInlineJson,
		html: stylingInlineHtml
	}, {
		label: 'styling external',
		json: stylingExternalJson,
		html: stylingExternalHtml
	}, {
		label: 'styling div (no webcomponent)',
		json: stylingDivJson,
		html: stylingDivHtml
	}]
};
