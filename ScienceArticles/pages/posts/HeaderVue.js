export default {
	name: 'HeaderVue',
	template: `
		<div class='header'>
			<button id="btnAdminPage"  v-on:click="$emit('redirect-admin-page')">Home Page</button>
			<h1>-POSTS-</h1>
		</div>
	`,
}