  
const { objectType } = require('@nexus/schema');

Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.content();
    t.model.published();
    t.model.user();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

module.exports = Post