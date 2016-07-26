import image from './image.json';
import dash from './dash.json';
import video from './video.json';
import video3d from './video3d.json';

module.exports = {
	manifests: [{
		label: 'image',
		json: image
	}, {
		label: 'DASH video, image, HTML',
		json: dash
	}, {
		label: 'Video, audio, image, HTML',
		json: video
	}, {
		label: '3D, video, image, text',
		json: video3d
	}]
};
