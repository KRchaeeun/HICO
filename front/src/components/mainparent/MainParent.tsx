import React, { useEffect, useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { childrenListState } from '@/state/Parentselectors'
import { childIdState } from '@/state/Parentatoms'
import { useNavigate } from 'react-router-dom'

const MainParent: React.FC = () => {
  const ChildrenList = useRecoilValue(childrenListState)
  const [childId, setChildId] = useRecoilState(childIdState)
  const navigate = useNavigate()

  useEffect(() => {
    if (ChildrenList.length > 0) {
      setChildId(ChildrenList[0].id)
      navigate('/mainparent/childstatus') // 자녀가 있으면 ChildStatus 페이지로 리디렉션
    } else {
      setChildId(0)
      navigate('/mainparent/nochild') // 자녀가 없으면 NoChild 페이지로 리디렉션
    }
  }, [ChildrenList, setChildId, navigate])

  // 페이지 리디렉션만 수행하므로, 추가적인 UI 렌더링은 필요하지 않습니다.
  return null
}

export default MainParent
