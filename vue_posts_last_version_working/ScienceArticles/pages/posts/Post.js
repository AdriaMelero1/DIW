export default {
	name: 'post',
	props: ['post'],
	emits: ['delete-post', 'edit-post'],
	methods: {
		// TWO WAYS OF DOING THE SAME
		
		// deletePost: function(post) {
		// 	this.$emit('delete-post', post);
		// },
		editPost: function(post) {
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

		<button v-on:click="$emit('delete-post', post)">Delete Post</button>
		<button v-on:click="editPost(post)">Edit Post</button>
		<button v-on:click="">Schedule Publish</button>
	</div>
	`,
}