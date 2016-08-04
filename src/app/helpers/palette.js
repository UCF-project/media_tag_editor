'use strict';

// Material design
import * as Colors from 'material-ui/styles/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';

// const primary = 'brown';
// const accent = 'lightGreen';
const primary = 'lightGreen';
const accent = 'brown';

const Palette = {
	// Base theme colors
	primary1Color: Colors[`${primary}500`],
	primary2Color: Colors[`${primary}700`],
	primary3Color: Colors[`${primary}300`],
	accent1Color: Colors[`${accent}500`],
	accent2Color: Colors[`${accent}700`],
	accent3Color: Colors[`${accent}300`],
	textColor: Colors.darkBlack,
	alternateTextColor: Colors.white,
	canvasColor: Colors.white,
	borderColor: Colors.grey300,
	disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
	pickerHeaderColor: Colors[`${primary}500`],
	clockCircleColor: ColorManipulator.fade(Colors.darkBlack, 0.07),
	shadowColor: Colors.fullBlack,

	// App Colors
	logo1Color: '#2D8BCB',
	logo2Color: '#A2C846',
	textLightColor: Colors.grey200,
	errorColor: Colors.red500,
	successColor: '#A2C846',
	hoverColor: Colors[`${primary}100`],
	warnColor: Colors.amber800
};

module.exports = Palette;
