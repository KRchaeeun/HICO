import React, { useEffect, useState, startTransition } from 'react'
import { completStory } from '@/state/MainChildSelector'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'

const Mainchild: React.FC = () => {
  const Story = useRecoilValue(completStory)
  const [goToWorldMap, setGoToWorldMap] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (Story === true) {
      setGoToWorldMap(true)
    }
  }, [Story])

  useEffect(() => {
    if (!goToWorldMap) {
      startTransition(() => {
        navigate('/mainchild/story')
      })
    } else {
      startTransition(() => {
        navigate('/mainchild/worldmap')
      })
    }
  }, [goToWorldMap])

  return <div>메인차일드</div>
}

export default Mainchild
