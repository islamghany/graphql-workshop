const {  objectType } = require('@nexus/schema')

User = objectType({
	name:'User',
	definition(t){
		t.model.id()
		t.model.name()
		t.model.email()
		t.model.password()
		t.model.posts({pagination:false})
		t.model.createdAt();
        t.model.updatedAt();
	}
})

module.exports = Post