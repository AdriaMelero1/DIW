//Clave encriptacion
var cryptoKey = "DIW2DAW"

// Verifica la disponibilidad de la API IndexedDB en varios navegadores
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Nombre de la base de datos IndexedDB
var database = "indexedDB_Adria";

// Constantes para los nombres de las tiendas de objetos y la versión de la base de datos
const DB_STORE_USERS = 'users';
const DB_STORE_USER_LOGGED_IN = 'user_logged_in';
const DB_VERSION = 1;

// Variables para almacenar la referencia a la base de datos y rastrear si está abierta o cerrada
var db;
var opened = false;

// Referencias a elementos del DOM y formulario
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

// openCreateDb
//  Abre y/o crea una base de datos IndexedDB
//  llama a onDbCompleted después de crear/abrir la base de datos

function openCreateDb(onDbCompleted) {

	if (opened) {
		// Si la base de datos ya está abierta, ciérrala antes de abrir una nueva
		db.close();
		opened = false;
	}
	// Intenta abrir la base de datos con la versión especificada
	req = indexedDB.open(database, DB_VERSION);

	// Evento que se dispara cuando la base de datos se abre con exito
	req.onsuccess = function (e) {
		// Asigna la instancia de la base de datos a la variable db
		db = this.result;
		console.log("openCreateDb: Base de datos abierta " + db);
		opened = true;

		// Llama a la función pasada como parámetro después de crear o abrir la base de datos
		onDbCompleted(db);
	};

	// Evento que se dispara cuando
	//  Se crea por primera vez el ObjectStore o Cambia la versión de la base de datos
	req.onupgradeneeded = function () {
		db = req.result;

		console.log("openCreateDb: Se necesita actualización " + db);
		// Crea un nuevo ObjectStore para usuarios
		var store = db.createObjectStore(DB_STORE_USERS, { keyPath: "id", autoIncrement: true });
		console.log("openCreateDb: Object store creado");

		// Crea índices en campos específicos para acelerar las búsquedas
		store.createIndex('username', 'username', { unique: true });
		store.createIndex('email', 'email', { unique: false });
		store.createIndex('password', 'password', { unique: false });
		store.createIndex('avatarurl', 'avatarurl', { unique: false });
		store.createIndex('admin', 'admin', { unique: false });

		// Crea un nuevo ObjectStore para usuarios loggeados
		store = db.createObjectStore(DB_STORE_USER_LOGGED_IN, { keyPath: "id", autoIncrement: true });
		store.createIndex('userLogedIn', 'userLogedIn', { unique: true });
		console.log("openCreateDb: Índice creado en userLogedIn");
	};

	req.onerror = function (e) {
		console.error("openCreateDb: Error al abrir o crear la base de datos:", e.target.errorCode);
	};
}

/* 
		addUser
	Agrega un nuevo usuario a la tabla users en la base de datos
 */
function addUser(db) {


	//creamos objeto con información del usuario y su contraseña encriptada
	var obj = {
		username: username.value,
		email: email.value,
		password: CryptoJS.AES.encrypt(password.value, cryptoKey).toString(),
		avatarurl: avatarurl,
		admin: admin.checked
	};

	// Inicia una nueva transacción en modo de escritura-lectura
	var tx = db.transaction(DB_STORE_USERS, "readwrite");
	var store = tx.objectStore(DB_STORE_USERS);

	// Obtiene el índice de username para verificar si ya existe
	var usernameIndex = store.index('username');
	var usernameReq = usernameIndex.get(username.value);

	// Evento que se dispara cuando se obtiene el usuario
	usernameReq.onsuccess = function (e) {
		try {
			// Intenta agregar el usuario a la tabla users
			req = store.add(obj);
		} catch (e) {
			console.log("Error adding user");
		}
		req.onsuccess = function (e) {
			console.log("addUser: Inserción de datos realizada con éxito. Id: " + e.target.result);
			// Después de agregar el usuario, llama a la función para agregar al usuario loggeado
			addLoggedInUser(db);
		};
		req.onerror = function (e) {
			console.error("addUser: Error al crear datos", this.error);
		};

		// Evento que se dispara cuando la transaccion se completa
		tx.oncomplete = function () {
			console.log("addUser: Transacción completada");
			// Cierra la base de datos
			db.close();
			opened = false;
		};
	}
}

/* 
 addLoggedInUser
 borra si hay algun usuario en la tabla y añade el usuario actualmente conectado a la tabla user_logged_in
 */
function addLoggedInUser(db) {

	// Inicia una nueva transacción en modo de escritura - lectura
	var txLoggedIn = db.transaction(DB_STORE_USER_LOGGED_IN, "readwrite");
	var storeLoggedIn = txLoggedIn.objectStore(DB_STORE_USER_LOGGED_IN);

	// Elimina cualquier registro existente con id 1 (solo puede haber un usuario conectado)
	var req = storeLoggedIn.delete(1);

	// Evento que se dispara cuando se completa la eliminación del usuario conectado anterior
	req.onsuccess = function (e) {
		console.log("deleteUser: Datos eliminados con éxito: " + username.value);

		// Operación a realizar después de eliminar un registro
		// readData();
	};

	req.onerror = function (e) {
		console.error("deleteUser: Error al eliminar datos:", e.target.errorCode);
	};

	// Evento que se dispara cuando la transacción se completa
	txLoggedIn.oncomplete = function () {
		console.log("deleteUser: Transacción completada");
		// Cierra la base de datos y actualiza el estado de 'opened'
		db.close();
		opened = false;
	};

	// Construye un objeto con los datos del usuario conectado
	let obj = { id: 1, userLoggedIn: username.value };

	try {
		// Intenta agregar el usuario conectado a la tabla
		req = storeLoggedIn.add(obj);
		req.onsuccess = function (e) {
			console.log("UserLoggedIn: Inserción de datos realizada con éxito. Id: " + e.target.result);
			// Redirige a la página principal después de agregar el usuario conectado
			location.href = '../pages/index.html';
		};

		req.onerror = function (e) {
			console.error("addUser: Error al crear datos", this.error);
		};

	} catch (e) {
		console.log("Catch");
	}

	// Evento que se dispara cuando la transacción se completa
	txLoggedIn.oncomplete = function () {
		console.log("Usuario conectado: Transacción completada");
		// Cierra la base de datos
		db.close();
		opened = false;
	};
}

//Read users recibe dos parametros, uno es la coexion a la base de datos y la segunda 
//es la funcion que tratara el resultado obtenido enviado por parametro
function readUsers(db, callback) {
	var tx = db.transaction(DB_STORE_USERS, "readonly");
	var store = tx.objectStore(DB_STORE_USERS);

	var result = [];
	var req = store.openCursor();

	req.onsuccess = function (e) {
		var cursor = e.target.result;

		if (cursor) {
			result.push(cursor.value);
			console.log(cursor.value);
			cursor.continue();
		} else {
			console.log("EOF");
			//Funcion que se llama al acabar de leer los usuarios
			callback(result)
		}
	};

	req.onerror = function (e) {
		console.error("readUsers: error reading data:", e.target.errorCode);
		throw new Error()
	};

	tx.oncomplete = function () {
		console.log("readUsers: tx completed");
		db.close();
		opened = false;
	};
}

//Hace lo mismo que la re read users pero con solo un usuario
function readUserLoggedIn(db, callback) {

	var tx = db.transaction(DB_STORE_USER_LOGGED_IN, "readonly");
	var store = tx.objectStore(DB_STORE_USER_LOGGED_IN);

	var result = [];
	var req = store.openCursor();

	req.onsuccess = function (e) {
		var cursor = e.target.result;

		if (cursor) {
			result.push(cursor.value);
			console.log(cursor.value);
			cursor.continue();
		} else {
			console.log("EOF");
			callback(result);
		}
	};

	req.onerror = function (e) {
		console.error("readUsers: error reading data:", e.target.errorCode);
	};

	tx.oncomplete = function () {
		console.log("readUserLoggedIn: tx completed");
		db.close();
		opened = false;
	};
}

function logout() {
	openCreateDb(function () {
		var txLoggedIn = db.transaction(DB_STORE_USER_LOGGED_IN, "readwrite");
		var storeLoggedIn = txLoggedIn.objectStore(DB_STORE_USER_LOGGED_IN);

		var req = storeLoggedIn.delete(1);

		req.onsuccess = function (e) {

			console.log("Logout correct transaction");

			location.href = "../pages/index.html";
		};

		req.onerror = function (e) {
			console.error("deleteUser: error removing data:", e.target.errorCode);
		};

		txLoggedIn.oncomplete = function () {
			console.log("deleteUser: tx completed");
			db.close();
			opened = false;
		};
	})
}