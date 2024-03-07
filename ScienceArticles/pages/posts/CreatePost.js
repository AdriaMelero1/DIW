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

			let post = {
				id: this.posts.length + 1,
				name: this.form.postName,
				summary: this.form.postSummary,
				content: this.form.postContent,
				author: this.form.postAuthor,
				creationDate: new Date().toISOString(),
				postImageUrl: this.form.postImageUrl
			}
			
				this.$emit('add-post', post);
				this.$router.push("/viewPosts")
		}
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
	<button v-if="!editing" @click="addPost">Add post</button>
	<button v-else @click="editPost">Edit Post</button>

</div>

	`,
}
