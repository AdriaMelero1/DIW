//Cuando se carga la pagina ejecuta esta funcion
window.onload = function(){
	//Primero abre la base de datos y cuando acaba ejecuta la funcion (openCreateDB oncompleted)
	openCreateDb(function (db) {
		//Leo los usuarios y cuando acaba, ejecuta esta funcion con el resultado de los usuarios como parametro
		readUsers(db, function (users) {
			//Busco si hay algun usuario loggeado
			readUserLoggedIn(db, function (loggedUser) {
				const currentUser = users.find(user => user.username === loggedUser[0]?.userLoggedIn)

				if (currentUser) {
					const container = document.getElementById('userdata');
					const avatar = document.createElement("img");
					const logoutButton = document.createElement("button");
					const btnPosts = document.createElement("button");
					logoutButton.onclick = logout;
					logoutButton.innerText = "Log out";
					btnPosts.innerText = "Posts Page";
					btnPosts.addEventListener("click", () => {
						location.href = "/pages/posts/index.html"
					});
					avatar.src = currentUser.avatarurl;

					container.innerHTML = "";

					container.append(avatar)
					container.append(logoutButton)
					container.append(btnPosts)
					if (currentUser.admin) {
						location.href = "../pages/adminPage.html"
					} else {
						console.log("Not admin");
					}
				}
			});
		});

		console.log("DB opened");
	});
}






