/* global MediaTag */
function onload() {
	if (MediaTag) {
		console.info('Event: on registered');
		MediaTag.events.on(MediaTag.constants.EVENT_MONITOR_UPDATED, logEvent);
	} else {
		console.error('No MediaTag found.');
	}
}

function logEvent(e) {
	console.info('Event: event e received', e);
	updateMonitor(e.monitor, e.value);
}

function createBox() {
	const boxId = 'mediaTagMonitorsBox';
	var divWrapperBox = document.getElementById(boxId);
	if (!divWrapperBox) {
		divWrapperBox = document.createElement('div');
		divWrapperBox.id = boxId;
		document.body.appendChild(divWrapperBox);
	}
	return divWrapperBox;
}

function createMonitor(monitorName) {
	const boxMonitorId = `mediaTagMonitor${monitorName}`;
	var divMonitor = document.getElementById(boxMonitorId);
	const divWrapperBox = createBox();

	if (!divMonitor) {
		divMonitor = document.createElement('div');
		divMonitor.id = boxMonitorId;
		divMonitor.innerHTML = `${monitorName}: <span></span>`;
		divWrapperBox.appendChild(divMonitor);
	}

	return divMonitor;
}

function updateMonitor(monitorName, monitorValue) {
	const divMonitor = createMonitor(monitorName);
	const valueElement = divMonitor.querySelector('span');
	valueElement.innerHTML = monitorValue;
}
