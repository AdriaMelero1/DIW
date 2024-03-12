const store = Pinia.defineStore('counter', {
  state: () => ({ 
    posts: [

    ]
  }),
  actions: {
    addPost:function(post){
      this.list.push(post);
    }
  }
});

export default store