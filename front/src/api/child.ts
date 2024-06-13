import { http } from '@/axios'

const api = {
  progress: '/stage/child',
  country: '/stage/country',
  book: '/stage/book',
  quiz: 'stage/quiz',
  tutorial: '/stage/tutorial',
  history: '/point/history',
  // 아이 계좌 조회
  getChildAccount: '/child/wallet',
}

async function progress() {
  return await http.get(api.progress)
}

async function country(countryId: number) {
  return await http.get(`${api.country}/${countryId}`)
}

async function book(stageId: number) {
  return await http.get(`${api.book}/${stageId}`)
}

async function quiz(stageId: number) {
  return await http.get(`${api.quiz}/${stageId}`)
}

async function saveAnswer(
  stageId: number,
  price: number,
  count: number,
  quizzes: Array<object>
) {
  const requestBody = {
    stageId: stageId,
    price: price,
    count: count,
    quizResultList: quizzes,
  }
  return await http.post(`${api.quiz}`, requestBody)
}
async function tutorial() {
  return await http.patch(api.tutorial)
}
async function getChildAccount() {
  return await http.get(api.getChildAccount)
}

async function history(countryId: number) {
  return await http.get(`${api.history}/${countryId}`)
}

export { progress, country, book, tutorial, quiz, saveAnswer, getChildAccount, history }
