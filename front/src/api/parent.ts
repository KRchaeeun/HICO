import axios, { AxiosError } from 'axios'
import { http } from '@/axios'

const api = {
  code: '/parent/main/code',
  getChild: '/parent/main',
  //자녀 학습 현황
  study: `/parent/main`,
  // 자녀 보유 포인트 현황
  point: `/parent/main/point`,
  // 부모 계좌, 송금 내역
  getAccount: '/parent/wallet',
  // 아이에게 송금하기
  postBalance: '/parent/wallet/tran',
}

async function code() {
  // http는 '@/axios.ts'에 작성된 자동 헤더 생성 전송 함수
  return await http.get(api.code)
}
async function getChild() {
  return await http.get(api.getChild)
}
async function study(id: number) {
  return await http.get(`${api.study}/${id}`)
}
async function point(id: number) {
  return await http.get(`${api.point}/${id}`)
}
async function getAccount() {
  return await http.get(api.getAccount)
}
async function postBalance(frTranId: number, password: string) {
  try {
    const response = await http.post(api.postBalance, {
      frTranId: frTranId,
      password: password,
    })
    return response.data
  } catch (error) {
    throw error
  }
}
export { code, getChild, study, point, getAccount, postBalance }
