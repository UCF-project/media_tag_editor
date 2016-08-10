'use strict';

// React
// Must be define because Route depends on it
import React from 'react';

// Router
import {
	Router,
	Route,
	IndexRoute,
	hashHistory
} from 'react-router';

// Views
import Main from 'app/views/main'; // eslint-disable-line import/no-extraneous-dependencies
import Editor from 'app/views/editor'; // eslint-disable-line import/no-extraneous-dependencies
import PanelMediaList from 'app/views/panel-media-list'; // eslint-disable-line import/no-extraneous-dependencies
import PanelMedia from 'app/views/panel-media'; // eslint-disable-line import/no-extraneous-dependencies
import NotFound from 'app/views/not-found'; // eslint-disable-line import/no-extraneous-dependencies

// Routes
const Routes = (
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<Route component={Editor}>
				<IndexRoute component={PanelMediaList}/>
				<Route path=":id" component={PanelMedia}/>
			</Route>
			<Route path="*" component={NotFound}/>
		</Route>
	</Router>
);

module.exports = Routes;
