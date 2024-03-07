import ViewPosts from './ViewPosts.js';
import CreatePost from './CreatePost.js';


let router = VueRouter.createRouter({

	history: VueRouter.createWebHistory(),
	routes: [
		{ path: '/viewPosts', name: 'ViewPosts', component: ViewPosts },
		{ path: '/createPost', name: 'createPost', component: CreatePost },
		{ path: '/editPost/:post', name: 'editPost', component: CreatePost }
	]
});

export default router;