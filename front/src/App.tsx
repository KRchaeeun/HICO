import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import RenderRoutes from './routes'
import { RecoilRoot } from 'recoil'
import { startTransition, useState, useEffect, Suspense } from 'react'
import LoadingIndicator from './Loading'

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Suspense fallback={<LoadingIndicator />}>
          <RenderRoutesWithTransition />
        </Suspense>
      </Router>
    </RecoilRoot>
  )
}

function RenderRoutesWithTransition() {
  const [isPending, setIsPending] = useState(false)

  const fetchData = () => {
    setIsPending(true)
    // 비동기 데이터 로딩 시작
    startTransition(() => {
      // 데이터 가져오는 비동기 작업
    })
    setIsPending(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return isPending ? <LoadingIndicator /> : <RenderRoutes />
}

export default App
