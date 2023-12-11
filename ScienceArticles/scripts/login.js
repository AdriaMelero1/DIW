
window.onload = () => {
	document.getElementById("saveBtn").onclick = () => {
		openCreateDb(function (db) {
			readUsers(db, function (users) {

				openCreateDb(function (db) {
					const currentUser = users.find(user => user.username === username.value)
					if (!currentUser) {
						console.log("Invalid username");
					} else {
						if (CryptoJS.AES.decrypt(currentUser.password, cryptoKey).toString(CryptoJS.enc.Utf8) == password.value) {
							addLoggedInUser(db);
						} else {
							console.log("Invalid password");
						}
					}
				})
			});
		});
	};
}
