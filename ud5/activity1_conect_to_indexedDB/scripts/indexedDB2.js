var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "indexedDB_Adria";
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
var db;
var opened = false;
const form = document.querySelector('form');
const saveBtn = document.getElementById('saveBtn');


//Get elements from document
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const avatars = document.getElementsByName('avatar');
const admin = document.getElementById('admin');
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
  var req = indexedDB.open(database, DB_VERSION);

  //This is how we pass the DB instance to our var
  req.onsuccess = function (e) {
    //Es un "punter a sa base de dades"
    db = this.result; // Or event.target.result
    console.log("openCreateDb: Databased opened " + db);
    opened = true;

    //The function passed by parameter is called after creating/opening database
    //onDbCompleted(db);
  };

  // Very important event fired when
  // 1. ObjectStore first time creation
  // 2. Version change
  req.onupgradeneeded = function () {

    //Value of previous db instance is lost. We get it back using the event
    db = req.result; //Or this.result

    console.log("openCreateDb: upgrade needed " + db);
    //Es sa resposta a sa creacio de sa taula
    var store = db.createObjectStore(DB_STORE_NAME, { keyPath: "id", autoIncrement: true });
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
  };

  req.onerror = function (e) {
    console.error("openCreateDb: error opening or creating DB:", e.target.errorCode);
  };


  req.addEventListener('error', (e) => {
    console.error("openCreateDb: error opening or creating DB:", e.target.errorCode);
});
}


function addUser(db) {
  let avatarurl;
  let req;

  for (i = 0; i < avatars.length; i++) {
    if (avatars[i].checked) {
      avatarurl = avatars[i].getAttribute('src');
      console.log("AVATAR URL: " + avatarurl);
    }
  }

  console.log("Name: " + username.value);
  var obj = { name: username.value, email: email.value, password: password.value, avatarurl: avatarurl, admin: admin};
  console.log("OBJECT: " + JSON.stringify(obj));

  // Start a new transaction in readwrite mode. We can use readonly also
  var tx = db.transaction(DB_STORE_NAME, "readwrite");
  var store = tx.objectStore(DB_STORE_NAME);

  try {
    // Inserts data in our ObjectStore
    req = store.add(obj);
  } catch (e) {
    console.log("Catch");
  }

  req.onsuccess = function (e) {
    console.log("addUser: Data insertion successfully done. Id: " + e.target.result);

    // Operations we want to do after inserting data
    /* readData();
    clearFormInputs(); */

  };
  req.onerror = function (e) {
    console.error("addUser: error creating data", this.error);
  };

  //After transaction is completed we close de database
  tx.oncomplete = function () {
    console.log("addUser: transaction completed");
    db.close();
    opened = false;
  };
}


window.addEventListener('load', (event) => {

  saveBtn.addEventListener('click', (e) => {
    openCreateDb(addUser)
  });
});

/* -------------------FORM VALIDATION------------------------- */

/* 

function isMandatory(inputArray) {
  let isValid = true;

  inputArray.forEach((input) => {
    if (input.value.trim() === '') {
      displayError(input, `${takeInputName(input)} It's Mandatory`);
      isValid = false;
    } else {
      displayCorrect(input);
    }
  });

  return isValid;
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


function isEmailValid(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    displayCorrect(input);
    return true;
  } else {
    const message = takeInputName(input) + " format not valid";
    displayError(input, message);
    return false;
  }
}



function checkPasswordsAreEqual(input1, input2) {

	if (input1.value != input2.value) {
		let message = takeInputName(input2) + " Must be equal to " + takeInputName(input1);
		displayError(input2, message)
		return false;
	} else {
		return true;
	}
}

function checkAvatarIsSelected(avatars){

	for (i = 0; i < avatars.length; i++) {

		if (avatars[i].checked){
			return true;
			break;
		}
	}

	return false;
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

function checkForm(e) {
  e.preventDefault();

  const isUsernameValid = isMandatory([username]) && checkLength(username, 3, 15);
  let isEmailValid = isMandatory([email]) && isEmailValid(email);
  const isPasswordValid = isMandatory([password]) && checkLength(password, 6, 25);
  const arePasswordsEqual = checkPasswordsAreEqual(password, password2);
  const isAvatarSelected = checkAvatarIsSelected(avatars);

  const formIsCorrect = isUsernameValid && isEmailValid && isPasswordValid && arePasswordsEqual && isAvatarSelected;

	console.log(formIsCorrect);
  if (formIsCorrect) {
    openCreateDb(addUser);
  }
	openCreateDb(addUser);

} */
