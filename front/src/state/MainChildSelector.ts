import { selector } from 'recoil'
import { progress, tutorial } from '@/api/child'
export const completStory = selector({
  key: 'completStory',
  get: async () => {
    try {
      const response = await progress()
      const isStory = await response.data.data.tutorial
      console.log(isStory)
      return isStory
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error)
      throw error
    }
  },
})
