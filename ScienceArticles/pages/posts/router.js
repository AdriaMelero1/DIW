import ViewPosts from './ViewPosts.js';

const Home = { template: '<div>FAKE HOME PAGE </div>' };


let router = VueRouter.createRouter({

	history: VueRouter.createWebHistory(),
	routes: [
		{ path: '/', name: 'Home', component: Home},
		{ path: '/viewposts:posts', name: 'ViewPosts', component: ViewPosts}
	]
});

export default router;