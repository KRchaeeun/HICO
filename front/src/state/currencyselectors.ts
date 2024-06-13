import { selector } from 'recoil'
import { currencydetailState } from './currencyatoms'
import { month } from '@/api/currency'

export const currencydataList = selector({
  key: 'currencydataList',
  get: async ({ get }) => {
    const countryId = get(currencydetailState)
    const response = await month(countryId)
    console.log('오늘환율리스트', response)
    const currencyList = []
    for (const currency of response.data.data) {
      currencyList.push({ x: currency.todayDate, y: currency.basicRate })
    }
    return currencyList
  },
})
export const todaydataList = selector({
  key: 'todaydataList',
  get: async ({ get }) => {
    const countryId = get(currencydetailState)
    const response = await month(countryId)
    console.log('오늘환율리스트', response)
    const amount = response.data.data
    const amountList = amount[amount.length - 1]
    console.log('오늘의 변동사항', amountList)
    return amountList
  },
})
