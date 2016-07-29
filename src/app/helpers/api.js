'use strict';

import Reflest from 'reflest';
import fetch from 'isomorphic-fetch';

const debug = require('debug')('MTME:Helpers:API');

function parseJSON(response) {
	debug('parseJSON', response);
	if (response.statusText === 'No Content') {
		return {};
	}
	return response.json();
}

function afterEachRequest(response) {
	debug('afterEachRequest', response);
	if (response.status < 200 || response.status >= 300) {
		const error = new Error(response.statusText);
		error.response = response;
		error.status = response.status;
		throw error;
	}
	return parseJSON(response);
}

const Api = Reflest.createGateway({
	request: fetch,
	origin: 'http://localhost:9092/',
	afterEachRequest,
	routes: {
		storageUpload: {
			pathname: 'api/v1.0/file',
			options: {
				credentials: 'include',
				method: 'POST'
			}
		}
	}
});

module.exports = Api;
