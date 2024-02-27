document.querySelector('#btnLogOut').addEventListener('click', () => {
	logout();
});


document.querySelector('#btnPosts').addEventListener('click', () => {
	location.href = "../pages/posts/index.html"
});


window.onload = function () {

	setTimeout(() => {
		if (!currentUser.admin) {
			window.location.href = "../pages/index.html";
		}
	}, 500);

}