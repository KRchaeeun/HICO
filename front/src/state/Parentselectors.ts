import { selector } from 'recoil'
import { getChild, study, point } from '@/api/parent'
import { childIdState } from '@/state/Parentatoms'

export const childrenListState = selector({
  key: 'ChildrenListState',
  get: async () => {
    try {
      const response = await getChild()
      const childrenData = await response.data.data
      console.log(childrenData)
      return childrenData
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error)
      throw error
    }
  },
})

export const getChildStudyList = selector({
  key: 'getChildStudyList',
  get: async ({ get }) => {
    const childId = get(childIdState)
    const response = await study(childId)
    return response.data
  },
})

export const getChildPointList = selector({
  key: 'getChildPointList',
  get: async ({ get }) => {
    const childId = get(childIdState);
    if (childId === 0) {
      return [];
    }
    const response = await point(childId);
    return response.data;
  },
})
