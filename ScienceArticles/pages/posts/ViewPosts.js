import Post from './Post.js';

export default {
	name: 'ViewPosts',
	props: ['posts'],
	emits: ['deletePost', 'addPost', 'editPost'],
	components: {
		Post
	},
	methods: {
		editPostBtn: function (post) {
			this.$emit('edit-post', post);
		},
		deletePost: function (id) {
			this.$emit('delete-post', id);
		},
		createPost() {
			console.log("Create post");
			this.$router.push("/createPost");
		}
	},
	template: `
	<h1>POSTS VIEW</h1>
	<div class="posts" v-if="posts.length > 0">
		<post v-for="p in posts" 
					v-bind:post="p" 
					v-bind:name="p.name" 
					v-on:delete-post="deletePost"
					v-on:edit-post="editPostBtn">
		</post>
	</div>
	<div v-else>There are no posts yet</div>
	<button @click="createPost">Create Post</button>
	`,
}