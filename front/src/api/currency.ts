import axios from 'axios'
import { http } from '@/axios'

const api = {
  month: '/rate/',
  today: '/rate',
}
async function month(countryID: number) {
  return await http.get(`${api.month}${countryID}`)
}
async function today() {
  return await http.get(api.today)
}

export { today, month }
