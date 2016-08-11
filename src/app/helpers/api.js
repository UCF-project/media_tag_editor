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
		},
		storageList: {
			pathname: 'api/v1.0/file/'
		},
		storageDelete: {
			pathname: 'api/v1.0/file/{filename}',
			options: {
				method: 'DELETE'
			}
		},
		storageConvert: {
			pathname: 'api/v1.0/convert',
			options: {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}
		},
		storageConvertStatus: {
			pathname: 'api/v1.0/convert/task/{taskId}'
		}
	}
});

module.exports = Api;
