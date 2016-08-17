'use strict';

import Reflux from 'reflux';
import Api from 'app/helpers/api'; // eslint-disable-line import/no-extraneous-dependencies

const StorageActions = Reflux.createActions({
	drop: {},
	dropAccept: {asyncResult: true},
	dropReject: {},
	dragEnter: {},
	dragLeave: {},
	list: {asyncResult: true},
	delete: {asyncResult: true},
	convert: {asyncResult: true}
});

StorageActions.dropAccept.listenAndPromise(Api.storageUpload);
StorageActions.list.listenAndPromise(Api.storageList);
StorageActions.delete.listenAndPromise(Api.storageDelete);
StorageActions.convert.listenAndPromise(options => {
	return Api.storageConvert(options).then(result => {
		return new Promise((resolve, reject) => {
			const timeout = setInterval(() => {
				Api.storageConvertStatus({}, {taskId: result.uuid})
				.then(taskStatus => {
					if (taskStatus.status !== 'CONVERTING') {
						clearInterval(timeout);
						if (taskStatus.status === 'ERROR') {
							reject(taskStatus.error.stderr);
						} else if (taskStatus.status === 'SUCCESS') {
							resolve();
						} else {
							reject('Task status unknown.');
						}
					}
				});
			}, 1000);
		});
	});
});

module.exports = StorageActions;
