import axios from 'axios'
import { token } from './api/member'

const { REACT_APP_SERVER_URI } = process.env

function createInstance() {
  const instance = axios.create({
    baseURL: REACT_APP_SERVER_URI,
  })

  // 요청 인터셉터
  instance.interceptors.request.use(
    (request) => {
      request.headers['Authorization'] =
        `Bearer ${localStorage.getItem('accessToken')}`
      return request
    },
    (error) => {
      console.log(error)
      return Promise.reject(error)
    }
  )

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => {
      // 응답이 성공적으로 반환된 경우
      return response
    },
    async (error) => {
      const originalRequest = error.config
      // 401 에러 처리 및 토큰 재발급 요청
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true // 재시도 플래그 설정
        try {
          const newTokenResponse = await token() // 리프레시 토큰으로 새 액세스 토큰 요청
          const { accessToken, refreshToken } = newTokenResponse.data.data
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', refreshToken)

          // 새 토큰으로 원본 요청의 헤더 업데이트
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
          return instance(originalRequest) // 업데이트된 요청 재시도
        } catch (tokenError) {
          console.error('Could not refresh token:', tokenError)
          // 재로그인이 필요합니다
          alert('다시 로그인 해주세요')
          window.location.href = '/'
          return Promise.reject(tokenError)
        }
      }
      return Promise.reject(error)
    }
  )
  return instance
}

export const http = createInstance()
