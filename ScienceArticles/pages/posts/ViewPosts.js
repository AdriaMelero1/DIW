export default {
	name: 'ViewPosts',
	props: ['posts'],
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

	<!-- If there are no posts, show this -->
	<p v-else>There are no posts yet</p>
	`,
}