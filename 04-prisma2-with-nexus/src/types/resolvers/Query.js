const { idArg, queryType, stringArg } = require("@nexus/schema");

const Query = queryType({
  defintion(t) {
    t.field("user", {
      type: "User",
      nullable: true,
      resolve: (parent, args, ctx) => {
        const { id } = args;
        return ctx.prisma.user.findOne({
          where: {
            id: Number(id),
          },
        });
      },
    });
    t.list.field("feed", {
      type: "Post",
      resolve: (parent, args, ctx) => {
        return ctx.prisma.post.findMany({
          where: { published: true },
        });
      },
    });

    t.field("post", {
      type: "Post",
      nullable: true,
      args: { id: intArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.post.findOne({
          where: {
            id: Number(id),
          },
        });
      },
    });
  },
});

module.exports = Query