import React, { useState, startTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { selectedItalyStageInfo } from '@/state/StageSubjectSelectors'
import Button from '@mui/material/Button'
import { Drawer, IconButton } from '@mui/material'
import NavbarDrawer from './navbar'
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded'

import styles from './ItalyStage.module.css'

const ItalyStage: React.FC = () => {
  //   // 해당 스테이지의 만화 주제
  //   const [topic, setTopic] = useState<string>("이탈리아의 역사적 사건");
  //   // 해당 스테이지의 번호 >> int로??
  //   const [stageNum, setStageNum] = useState<string>("1");

  // 해당 스테이지의 번호와 주제 가져오기
  const { stageNum, topic } = useRecoilValue(selectedItalyStageInfo)

  const characterImage = require('@/assets/fairy_italy.png')

  // 퀴즈 시작하기 버튼 >> 경로 이동 필요!!
  const navigate = useNavigate()

  const startClick = () => {
    startTransition(() => {
      navigate('/mainchild/stage/cartoon')
        window.location.reload()
    })
  }

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // navbar open
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true)
  }

  // navbar close
  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
  }

  return (
    // 화면 정 가운데 div
    <div className={styles.mainContainer}>
      {/* navbar 버튼 */}
      <IconButton
        onClick={handleDrawerOpen}
        sx={{
          position: 'fixed', // 요소를 뷰포트에 대해 고정
          top: 0, // 상단에서 20px 떨어진 위치
          right: 165, // 오른쪽에서 20px 떨어진 위치
          backgroundColor: 'rgba(255, 164, 58, 0.95)',
          borderRadius: '0 0 40px 40px', // 아래쪽 모서리에만 border-radius 적용
          '&:hover': {
            backgroundColor: '#FF8D09', // 호버 배경색
          },
          zIndex: 1200, // 다른 요소들 위에 오도록 z-index 설정
        }}
      >
        <KeyboardDoubleArrowDownRoundedIcon
          sx={{ fontSize: '50px', color: 'white' }}
        />
      </IconButton>
      <Drawer anchor="top" open={isDrawerOpen} onClose={handleDrawerClose}>
        <NavbarDrawer onClose={handleDrawerClose} />
      </Drawer>
      <h1 className={styles.title}>Stage {stageNum}</h1>
      <div className={styles.topic}>{topic}에 대해 </div>
      <div className={styles.topic}>알아볼까요? </div>
      <div>
        {/* 캐릭터 자리 */}
        <img
          src={characterImage}
          alt="이탈리아 캐릭터"
          className={styles.characterImage}
        />
      </div>
      <Button
        onClick={startClick}
        variant="contained"
        sx={{
          width: 220,
          height: 60,
          backgroundColor: '#1C7CFD',
          ':hover': {
            backgroundColor: '#005AE6', // 호버 시 색상 조금 더 어둡게 설정
            transform: 'scale(1.05)', // 호버 시 버튼 크기 증가
            opacity: 1, // 호버 시 100% 투명도
          },
          zIndex: 1,
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        시작하기
      </Button>

      <div className={styles.cloudContainer}>
        <div className={styles.cloud}></div>
      </div>
    </div>
  )
}

export default ItalyStage
