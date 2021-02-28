import { Context, getStory, getStoryIds } from '../../../utils'

export default {
  Query: {
    feed: async (parent: any, args, ctx: Context) => {
      const storyIds = await getStoryIds()
      const data = await Promise.all(storyIds.map((id) => getStory(id)))

      return data
    },
    post: (parent: any, { storyId }, ctx: Context) => {
      return getStory(storyId)
    },
  },
}
