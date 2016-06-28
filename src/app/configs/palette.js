'use strict';

// Material design
import * as Colors from 'material-ui/styles/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';

const Palette = {
	// Base theme colors
	primary1Color: Colors.indigo500,
	primary2Color: Colors.indigo700,
	primary3Color: Colors.indigo300,
	accent1Color: Colors.teal500,
	accent2Color: Colors.teal700,
	accent3Color: Colors.teal300,
	textColor: Colors.darkBlack,
	alternateTextColor: Colors.white,
	canvasColor: Colors.white,
	borderColor: Colors.grey300,
	disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
	pickerHeaderColor: Colors.indigo500,
	clockCircleColor: ColorManipulator.fade(Colors.darkBlack, 0.07),
	shadowColor: Colors.fullBlack,

	// App Colors
	logo1Color: '#2D8BCB',
	logo2Color: '#A2C846',
	textLightColor: Colors.grey200,
	errorColor: Colors.red500,
	successColor: '#A2C846',
	hoverColor: Colors.indigo100,
	warnColor: Colors.amber800
};

module.exports = Palette;
