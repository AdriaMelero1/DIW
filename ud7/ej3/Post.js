export default {
	name: 'post',
	props: ['post'],
	methods: {
		deletePost: function(post) {
			this.$emit('delete-post', post);
		},
		editPostBtn: function(post) {
			this.$emit('edit-post', post);
		}
	},
	template: `
	<div class="post">
		<p>Post Name: {{post.name}}</p>
		<p>Post Summary: {{post.summary}}</p>
		<p>Author: {{post.author}}</p>
		<img :src="post.postImageUrl">
		<p id="creationDate">Created: {{post.creationDate.split('T')[0]}}</p>
		<button v-on:click="deletePost(post)">Delete Post</button>
		<button v-on:click="editPostBtn(post)">Edit Post</button>
		<button v-on:click="">Schedule Publish</button>
	</div>
	`,
}