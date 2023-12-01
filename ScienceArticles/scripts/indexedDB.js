var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "indexedDB_Adria";
const DB_STORE_USERS = 'users';
const DB_STORE_USER_LOGGED_IN = 'user_logged_in';
const DB_VERSION = 1;
var db;
var opened = false;

const form = document.querySelector('form');
const saveBtn = document.getElementById('saveBtn');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const avatars = document.getElementsByName('avatar');
const admin = document.getElementById('admin');
let req;

let avatarurl;
/**
 * openCreateDb
 * opens and/or creates an IndexedDB database
 */
function openCreateDb(onDbCompleted) {

	if (opened) {
		db.close();
		opened = false;
	}
	//We could open changing version ..open(database, 3)
	req = indexedDB.open(database, DB_VERSION);

	//This is how we pass the DB instance to our var
	req.onsuccess = function (e) {
		db = this.result; // Or event.target.result
		console.log("openCreateDb: Databased opened " + db);
		opened = true;

		//The function passed by parameter is called after creating/opening database
		//onDbCompleted(db);
		addUser(db);

	};

	// Very important event fired when
	// 1. ObjectStore first time creation
	// 2. Version change
	req.onupgradeneeded = function () {

		//Value of previous db instance is lost. We get it back using the event
		db = req.result; //Or this.result

		console.log("openCreateDb: upgrade needed " + db);
		var store = db.createObjectStore(DB_STORE_USERS, { keyPath: "id", autoIncrement: true });
		console.log("openCreateDb: Object store created");

		store.createIndex('username', 'username', { unique: true });
		console.log("openCreateDb: Index created on name");
		store.createIndex('email', 'email', { unique: false });
		console.log("openCreateDb: Index created on email");
		store.createIndex('password', 'password', { unique: false });
		console.log("openCreateDb: Index created on password");
		store.createIndex('avatarurl', 'avatarurl', { unique: false });
		console.log("openCreateDb: Index created on avatarurl");
		store.createIndex('admin', 'admin', { unique: false });
		console.log("openCreateDb: Index created on admin");

		store = db.createObjectStore(DB_STORE_USER_LOGGED_IN, { keyPath: "id", autoIncrement: true });
		store.createIndex('userLogedIn', 'userLogedIn', { unique: true });
		console.log("openCreateDb: Index created on userLogedIn");
	};

	req.onerror = function (e) {
		console.error("openCreateDb: error opening or creating DB:", e.target.errorCode);
	};
}


function addUser(db) {



	console.log(admin);

	//Falte encriptar contraseña aqui

	var obj = { username: username.value, email: email.value, password: password.value, avatarurl: avatarurl, admin: admin.checked };


	console.log(obj);

	// Start a new transaction in readwrite mode. We can use readonly also
	//Insert user
	var tx = db.transaction(DB_STORE_USERS, "readwrite");
	var store = tx.objectStore(DB_STORE_USERS);

	var usernameIndex = store.index('username');
	var usernameReq = usernameIndex.get(username.value);

	usernameReq.onsuccess = function (e) {
		try {
			req = store.add(obj);
		} catch (e) {
			console.log("Catch");

		}
		req.onsuccess = function (e) {
			console.log("addUser: Data insertion successfully done. Id: " + e.target.result);
			addLoggedInUser(db);
		};
		req.onerror = function (e) {
			console.error("addUser: error creating data", this.error);
		};

		tx.oncomplete = function () {
			console.log("addUser: transaction completed");
			db.close();
			opened = false;
		};
	}
}

function addLoggedInUser(db) {

	var txLoggedIn = db.transaction(DB_STORE_USER_LOGGED_IN, "readwrite");
	var storeLoggedIn = txLoggedIn.objectStore(DB_STORE_USER_LOGGED_IN);

	let obj = { userLoggedIn: username.value };
	console.log("USERLI: " + obj.userLoggedIn);
	try {

		req = storeLoggedIn.add(obj);
		req.onsuccess = function (e) {
			console.log("UserLoggedIn: Data insertion successfully done. Id: " + e.target.result);
			location.href = '../pages/index.html';

		};

		req.onerror = function (e) {
			console.error("addUser: error creating data", this.error);
		};

	} catch (e) {
		console.log("Catch");
	}

	txLoggedIn.oncomplete = function () {
		console.log("User logged in: transaction completed");
		db.close();
		opened = false;
	};
}





window.addEventListener('load', (event) => {
	saveBtn.addEventListener('click', (e) => {




		openCreateDb(addUser)




		for (i = 0; i < avatars.length; i++) {
			if (avatars[i].checked) {
				avatarurl = avatars[i].getAttribute('src');
				console.log("AVATAR URL: " + avatarurl);
			}
		}

		checkLength(password, 8, 20);

		checkPasswordIsValid(password);

		isEmailValid(email);

		checkPasswordsAreEqual(password, password2);

		isMandatory([username, email, password])


		let isAllValid = isEmailValid(email) && checkLength(password, 8, 20) && checkPasswordsAreEqual(password, password2)
			&& isMandatory([username, email, password, password2]) && avatarurl !== undefined && avatarurl !== '' && checkPasswordIsValid(password);

		if (isAllValid) {
			openCreateDb(addUser)
		}


	});
});






/* -------------- FORM VALIDATION ------------------ */


function isMandatory(inputArray) {

	allCorrect = true;

	inputArray.forEach((input) => {
		if (input.value.trim() === '') {
			displayError(input, `${takeInputName(input)} It s Mandatory`);
			allCorrect = false;
		} else {
			displayCorrect(input);
		}
	});

	return allCorrect;
}


function checkPasswordsAreEqual(input1, input2) {

	if (input1.value != input2.value) {
		let message = "Passwords must be equal ";
		displayError(input2, message)
		return false;
	} else {
		return true;
	}
}

function checkPasswordIsValid(input) {

	//Aquest regex no agafa caracters com . - _
	const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	if (re.test(input.value.trim())) {
		displayCorrect(input);
		return true;
	} else {
		let message = takeInputName(input) + " format not valid. Must contain upper and lower case letters, a number and a special character.";
		displayError(input, message);
		return false;
	}
}


function isEmailValid(input) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(input.value.trim())) {
		displayCorrect(input);
		return true;
	} else {
		let message = takeInputName(input) + " format not valid";
		displayError(input, message);
		return false;
	}
}



function checkLength(input, min, max) {
	if (input.value.length < min) {
		displayError(input, `${takeInputName(input)} must have at least ${min} characters`);
		return false;
	} else if (input.value.length > max) {
		displayError(input, `${takeInputName(input)} must have less than ${max} characters`);
		return false;
	} else {
		displayCorrect(input);
		return true;
	}
}



function displayError(input, message) {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const label = formControl.querySelector('label');
	const small = formControl.querySelector('small');
	small.innerText = message;
}

function displayCorrect(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control correct';
}

function takeInputName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
