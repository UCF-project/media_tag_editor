'use strict';

// Vendors
import Spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// APP
import Palette from './palette';

const Theme = getMuiTheme({
	spacing: Spacing,
	fontFamily: 'Roboto, sans-serif',
	palette: Palette
});

module.exports = Theme;
