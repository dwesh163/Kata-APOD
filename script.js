let ActivePage = 'apod';
let notActivePage = 'settings';
let quality = '';

async function setToday() {
	const url = new URL(window.location.href);
	if (url.searchParams.get('date')) {
		document.getElementById('date').value = url.searchParams.get('date');
	} else {
		var now = new Date();
		var day = ('0' + now.getDate()).slice(-2);
		var month = ('0' + (now.getMonth() + 1)).slice(-2);
		var today = now.getFullYear() + '-' + month + '-' + day;
		console.log('toda:', today);
		document.getElementById('date').value = today;
	}

	document.getElementById('date').style.display = '';
}

async function fetchAPI() {
	activePageFunction('apod');

	const dateInput = document.getElementById('date');
	const API_key = localStorage.getItem('APOD_APIKey');

	let localData = localStorage.getItem('APOD');

	if (localData == null) {
		localStorage.setItem('APOD', '{}');
	}

	if (JSON.parse(localStorage.getItem('APOD'))[dateInput.value]) {
		data = JSON.parse(localStorage.getItem('APOD'))[dateInput.value];
		setPage(JSON.parse(data));
	} else {
		const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${dateInput.value}`);
		if (response.status != 200) {
			const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_key}&date=${dateInput.value}`);
			if (response.status != 200) {
				//activePageFunction('settings');
			} else {
				const JSONObject = await response.json();
				setPage(JSON.parse(JSON.stringify(JSONObject, null, 3)));
				localData = JSON.parse(localStorage.getItem('APOD'));
				localData[dateInput.value] = JSON.stringify(JSONObject);
				localStorage.setItem('APOD', JSON.stringify(localData));
			}
		} else {
			const JSONObject = await response.json();
			setPage(JSON.parse(JSON.stringify(JSONObject, null, 3)));
			localData = JSON.parse(localStorage.getItem('APOD'));
			localData[dateInput.value] = JSON.stringify(JSONObject);
			localStorage.setItem('APOD', JSON.stringify(localData));
		}
	}
}

function setPage(data) {
	document.getElementsByClassName('title')[0].innerHTML = data['title'];
	document.title = `${data['title']} - APOD`;
	//document.getElementsByClassName("date")[0].innerHTML = data["date"];
	document.getElementsByClassName('explanation')[0].innerHTML = data['explanation'];

	if (data['copyright'] != null) {
		document.getElementsByClassName('copyright')[0].innerHTML = data['copyright'];
	} else {
		document.getElementsByClassName('copyright')[0].innerHTML = 'NASA public domain';
	}
	if (data['media_type'] == 'image') {
		if (quality == 'hd') {
			document.getElementsByClassName('hdurl')[0].src = data['hdurl'];
		} else {
			document.getElementsByClassName('hdurl')[0].src = data['url'];
		}
		document.getElementsByClassName('video')[0].src = '';
		document.getElementsByClassName('video')[0].style.position = 'absolute';
		document.getElementsByClassName('hdurl')[0].style.position = 'relative';
		document.getElementsByClassName('video')[0].style.left = '-500px';
	} else {
		document.getElementsByClassName('hdurl')[0].src = '';
		document.getElementsByClassName('video')[0].src = data['url'];
		document.getElementsByClassName('video')[0].style.left = '0px';
		document.getElementsByClassName('video')[0].src = data['url'];
		document.getElementsByClassName('hdurl')[0].style.position = 'absolute';
		document.getElementsByClassName('video')[0].style.position = 'relative';
	}
}

async function setKey() {
	const API_key = document.getElementById('APIKey').value;
	localStorage.setItem('APOD_APIKey', API_key);
	fetchAPI();
}

function setDay(move) {
	var current = document.getElementById('date').value;
	newDate = new Date(current);

	var now = new Date(current);
	var day = ('0' + now.getDate()).slice(-2);
	var month = ('0' + (now.getMonth() + 1)).slice(-2);
	var newCurrent = now.getFullYear() + '-' + month + '-' + day;

	var now = new Date();
	var day = ('0' + now.getDate()).slice(-2);
	var month = ('0' + (now.getMonth() + 1)).slice(-2);
	var date = now.getFullYear() + '-' + month + '-' + day;

	if (move == 'before') {
		newDate.setDate(newDate.getDate() - 1);
	}
	if (move == 'after' && date != newCurrent) {
		newDate.setDate(newDate.getDate() + 1);
	}

	var now = new Date(newDate);
	var day = ('0' + now.getDate()).slice(-2);
	var month = ('0' + (now.getMonth() + 1)).slice(-2);
	var date = now.getFullYear() + '-' + month + '-' + day;
	window.location.href = `?date=${date}`;

	fetchAPI();
}

function activePageFunction(active) {
	if (active == 'apod') {
		ActivePage = 'apod';
		notActivePage = 'settings';
	}
	if (active == 'settings') {
		ActivePage = 'settings';
		notActivePage = 'apod';
	}

	document.getElementsByClassName(`section-${ActivePage}`)[0].style.visibility = 'visible';
	document.getElementsByClassName(`section-${notActivePage}`)[0].style.visibility = 'hidden';

	if (ActivePage == 'apod') {
		document.getElementsByClassName(`section-settings`)[0].style.position = 'absolute';
		document.getElementsByClassName(`section-apod`)[0].style.position = 'relative';
		document.getElementsByClassName(`section-settings`)[0].style.marginTop = '-100px';
	} else {
		document.getElementsByClassName(`section-settings`)[0].style.position = 'relative';
		document.getElementsByClassName(`section-apod`)[0].style.position = 'absolute';
		document.getElementsByClassName(`section-settings`)[0].style.marginTop = '20%';
		document.getElementsByClassName();
	}

	document.getElementsByClassName(`line-${ActivePage}`)[0].style.visibility = 'visible';
	document.getElementsByClassName(`line-${notActivePage}`)[0].style.visibility = 'hidden';
}

function over(mode) {
	if (mode != ActivePage) {
		document.getElementsByClassName(`line-${ActivePage}`)[0].style.visibility = 'hidden';
		document.getElementsByClassName(`line-${notActivePage}`)[0].style.visibility = 'visible';
	}
}

function out(mode) {
	if (mode != ActivePage) {
		document.getElementsByClassName(`line-${ActivePage}`)[0].style.visibility = 'visible';
		document.getElementsByClassName(`line-${notActivePage}`)[0].style.visibility = 'hidden';
	}
}

setTimeout(() => {
	setToday();
}, 0.1);

setTimeout(() => {
	fetchAPI();
}, 0.1);
