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
				Api.storageConvertStatus({}, {taskId: result.task.uuid})
				.then(taskStatus => {
					if (taskStatus.task.status !== 'CONVERTING') {
						clearInterval(timeout);
						if (taskStatus.task.status === 'ERROR') {
							reject(taskStatus.task.error.stderr);
						} else if (taskStatus.task.status === 'SUCCESS') {
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
