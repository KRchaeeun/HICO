import axios, { AxiosError } from 'axios'

const { REACT_APP_SERVER_URI } = process.env

const api = {
  join: `${REACT_APP_SERVER_URI}/member/join`,
  login: `${REACT_APP_SERVER_URI}/member/login`,
  token: `${REACT_APP_SERVER_URI}/member/token`,
  logout: `${REACT_APP_SERVER_URI}/member/logout`,
}
function join(
  email: string,
  password: string,
  name: string,
  birthDate: string,
  gender: string,
  role: string,
  code: string
) {
  return axios.post(api.join, {
    email: email,
    password: password,
    name: name,
    birthDate: birthDate,
    gender: gender,
    role: role,
    code: code,
  })
}
function login(email: string, password: string) {
  return axios.post(api.login, {
    email: email,
    password: password,
  })
}
// 토큰 재발급 함수
function token() {
  const refreshToken = localStorage.getItem('refreshToken')
  return axios.post(
    api.token,
    {},
    { headers: { Authorization: `Bearer ${refreshToken}` } }
  ) // header에 refrechtoken 전송
}
//로그아웃
function logout() {
  const accessToken = localStorage.getItem('accessToken')
  return axios.post(
    api.logout,
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
}

export { join, login, token, logout }
