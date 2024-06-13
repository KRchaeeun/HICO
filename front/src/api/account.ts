import { http } from '@/axios'

const api = {
  list: '/account',
  register: '/account',
  make: '/account/make',
}

async function list() {
  return await http.get(api.list)
}

async function register(accountNo: string, password: string) {
  const requestBody = {
    accountNo: accountNo,
    password: password,
  }
  return await http.post(api.register, requestBody)
}

async function make(password: string) {
  const requestBody = {
    password: password,
  }
  return await http.post(api.make, requestBody)
}

export { list, register, make }
