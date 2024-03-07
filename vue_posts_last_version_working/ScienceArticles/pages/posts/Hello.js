export default {
	name: 'hello',
	template: `
		<div>
			<p>HELLO {{ $route.params.message }}</p>
			<input type="button"
		</div>
	`,
}