import { Context, getUserId } from '../../../utils'

export default {
  Query: {
    me: (parent, args, ctx: Context) => {
      const userId = getUserId(ctx)
      return ctx.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      })
    },
  },
}
