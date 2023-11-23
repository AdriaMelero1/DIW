var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "indexedDB_Adria";
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
var db;
var opened = false;


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
    var store = db.createObjectStore(DB_STORE_NAME, { keyPath: "id", autoIncrement: true });
    console.log("openCreateDb: Object store created");

    store.createIndex('name', 'name', { unique: false });
    console.log("openCreateDb: Index created on name");
    store.createIndex('lastname', 'lastname', { unique: false });
    console.log("openCreateDb: Index created on lastname");
    store.createIndex('birthdate', 'birthdate', { unique: false });
    console.log("openCreateDb: Index created on birthdate");
    store.createIndex('password', 'password', { unique: false });
    console.log("openCreateDb: Index created on password");
  };

  req.onerror = function (e) {
    console.error("openCreateDb: error opening or creating DB:", e.target.errorCode);
  };
}


function addUser(db) {
  var name = "Adria";
  var lastname = "Melero";
  var birthdate = "30-10-2003";
  var password = "asdkasd";
  var obj = { name: name, lastname: lastname, birthdate: birthdate, password: password };

  console.log(obj);

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
  openCreateDb();

  setTimeout(function () {
    console.log(db);
  }, 1000)


});