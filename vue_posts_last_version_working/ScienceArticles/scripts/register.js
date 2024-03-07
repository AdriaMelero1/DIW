window.addEventListener('load', (event) => {
	saveBtn.addEventListener('click', (e) => {
		
		/* -------------- VALIDACIÓN DE FORMULARIO ------------------ */
		for (i = 0; i < avatars.length; i++) {
			if (avatars[i].checked) {
				avatarurl = avatars[i].getAttribute('src');
			}
		}
		

		let isAllValid = isEmailValid(email) & checkLength(password, 8, 20) & checkPasswordsAreEqual(password, password2)
			& isMandatory([username, email, password, password2]) & avatarurl !== undefined & avatarurl !== '' & checkPasswordIsValid(password);

		if (isAllValid) {
			openCreateDb(addUser)
			console.log("All valid");
		}
	});
});



function isMandatory(inputArray) {

	allCorrect = true;

	// Itera sobre el array de elementos de entrada
	inputArray.forEach((input) => {
		if (input.value.trim() === '') {
			// Si el campo está vacío, muestra un mensaje de error
			displayError(input, `${takeInputName(input)} es obligatorio`);
			allCorrect = false;
		} else {
			// Si el campo tiene contenido, indica que está correcto
			displayCorrect(input);
		}
	});

	// Devuelve true si todos los campos obligatorios tienen contenido, de lo contrario, false
	return allCorrect;
}

function checkPasswordsAreEqual(input1, input2) {

	if (input1.value != input2.value) {
		// Si las contraseñas no son iguales, muestra un mensaje de error
		let message = "Las contraseñas deben ser iguales";
		displayError(input2, message)
		return false;
	} else {
		// Si las contraseñas son iguales, devuelve true
		return true;
	}
}

function checkPasswordIsValid(input) {

	// Expresión regular para verificar el formato de la contraseña
	const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	if (re.test(input.value.trim())) {
		// Si la contraseña cumple con los requisitos, indica que está correcta
		displayCorrect(input);
		return true;
	} else {
		// Si la contraseña no cumple con los requisitos, muestra un mensaje de error
		let message = takeInputName(input) + " no es válida. Debe contener letras mayúsculas y minúsculas, un número y un carácter especial.";
		displayError(input, message);
		return false;
	}
}

function isEmailValid(input) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(input.value.trim())) {
		// Si la dirección de correo electrónico tiene un formato válido, indica que está correcta
		displayCorrect(input);
		return true;
	} else {
		// Si la dirección de correo electrónico no tiene un formato válido, muestra un mensaje de error
		let message = takeInputName(input) + " no tiene un formato válido";
		displayError(input, message);
		return false;
	}
}

function checkLength(input, min, max) {
	if (input.value.length < min) {
		// Si la longitud es menor que el mínimo, muestra un mensaje de error
		displayError(input, `${takeInputName(input)} debe tener al menos ${min} caracteres`);
		return false;
	} else if (input.value.length > max) {
		// Si la longitud es mayor que el máximo, muestra un mensaje de error
		displayError(input, `${takeInputName(input)} debe tener menos de ${max} caracteres`);
		return false;
	} else {
		// Si la longitud está dentro del rango especificado, indica que está correcto
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