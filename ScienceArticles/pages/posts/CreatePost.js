export default {
	name: 'CreatePost',
	emits: ['deletePost', 'addPost'],
	props: ['posts', 'editing'],
	data() {
		return {
			form: {
				postName: '',
				postSummary: '',
				postContent: '',
				postAuthor: '',
				postImageUrl: '',
				creationDate: '',
				publicationDate: '',
				postStatus: ''
			}
		}
	},
	methods: {
		addPost() {
			console.log("Length: " + this.posts.length);
			console.log("Name: " + this.form.postName);
			let post = {
				id: this.posts.length + 1,
				name: this.form.postName,
				summary: this.form.postSummary,
				content: this.form.postContent,
				author: this.form.postAuthor,
				creationDate: new Date().toISOString(),
				postImageUrl: this.form.postImageUrl
			}


			if(validateForm()){
				this.$emit('add-post', post);
				this.$router.push("/viewPosts")
				this.emptyForm();

			}

		},
		editPost() {

			/* Same as add post but first we find the post whos id is the same as the actualPostId*/
			const postIndex = this.posts.findIndex(post => post.id === this.actualPostId);
			if (postIndex !== -1) {
				/* If the input values are valid, the post from the posts array is modified */
				this.posts[postIndex].name = this.form.postName;
				this.posts[postIndex].summary = this.form.postSummary;
				this.posts[postIndex].content = this.form.postContent;
				this.posts[postIndex].author = this.form.postAuthor;
				this.posts[postIndex].postImageUrl = this.form.postImageUrl;

				localStorage.setItem("posts", JSON.stringify(this.posts));

				this.emptyForm();
				this.editing = false;

			}
		},
		/* Creates the url for the uploaded image and set it to the form input */
		saveImage(event) {
			let file = event.target.files[0];
			this.form.postImageUrl = URL.createObjectURL(file);
		},
		/* Sets all the form inputs to empty */
		emptyForm() {
			this.form.postName = '';
			this.form.postContent = '';
			this.form.postAuthor = '';
			this.form.postImageUrl = '';
			this.$refs.imgInput.value = '';
			this.form.postSummary = '';
		},

	},
	template: `
	<h1>CREATE POST</h1>
	<div class="createEdit">
	<form>
		<h2>{{ editing ? 'Edit post' : 'Create post'}}</h2>
		<input type="text" placeholder="Post Name" v-model="form.postName" required>
		<input type="text" placeholder="Summary" maxlength="35" v-model="form.postSummary" required>
		<textarea name="postContent" id="postContent" v-model="form.postContent" required></textarea>
		<select name="author" v-model="form.postAuthor" required>
			<option value="" disabled selected>Select an author</option>
			<option value="Adria">Adria</option>
			<option value="Pedro">Pedro</option>
			<option value="Juan">Juan</option>
			<option value="Sergi">Sergi</option>
		</select>
		<input type="file" name="postImage" @change="saveImage" ref="imgInput">
	</form>
	<div class="message"></div>
	<button @click="addPost">Add post</button>
</div>

	`,
}

function validateForm() {
	const inputs = document.querySelectorAll('input[required]');
	let isValid = true;
	inputs.forEach(input => {
		if (input.value.trim() === '') {
			$('.message').text('All fields are required');
			isValid = false;
		}
	});
	if (document.querySelector('select').value === '' || document.querySelector('textarea').value.trim() === '') {
		$('.message').text('All fields are required');
		isValid = false;
	}
	if (isValid) {
		$('.message').text('');
	}
	return isValid;
}