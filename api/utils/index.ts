import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { verify } from 'jsonwebtoken'
import { Context, createContext } from './context'

export const baseUrl = 'https://hacker-news.firebaseio.com/v0/'
export const newStoriesUrl = `${baseUrl}askstories.json`
export const storyUrl = `${baseUrl}item/`

const APP_SECRET = 'appsecret321'

interface Token {
  userId: string
}

export interface Post {
  by: string
  title: string
  text: string
  score: string
}

function getUserId(context: Context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as Token
    return verifiedToken && verifiedToken.userId
  }
}

export const selectFields = ({ by, title, text, score }: Post) => ({
  by,
  title,
  text,
  score,
})

export const getStory = async (storyId: string) => {
  const result = await axios.get(`${storyUrl + storyId}.json`)
  return selectFields(result.data) as Post
}

export const getStoryIds = async () => {
  const result = await axios.get(newStoriesUrl)
  return result.data as string[]
}

export { Context, createContext, getUserId, APP_SECRET }
