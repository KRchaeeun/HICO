import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Cartoon.module.css'
import { bookList } from '@/state/childselectors'
import { useRecoilValue } from 'recoil'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import play from '../../assets/play.png'
import stop from '../../assets/stop.png'
import previous from '../../assets/preview.png'
import next from '../../assets/next.png'
import arrow from '@/assets/arrow.png'
import { Drawer, IconButton } from '@mui/material'
import NavbarDrawer from './navbar'
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded'

const Cartoon: React.FC = () => {
  const navigate = useNavigate()
  const cartoonList = useRecoilValue(bookList) || []

  const [currentCartoonIndex, setCurrentCartoonIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false) // TTS 재생 상태를 추적하는 상태
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [currentText, setCurrentText] = useState(
    'TTS 재생하여 설명을 들을 수 있어요 :)'
  )

  const [animation, setAnimation] = useState('')

  useEffect(() => {
    setAnimation('fadeIn')
  }, [currentCartoonIndex])

  useEffect(() => {
    const setVoicesList = () => {
      const allVoices = speechSynthesis.getVoices()
      const koVoices = allVoices.filter((voice) => voice.lang.startsWith('ko'))
      setVoices(koVoices)
    }

    setVoicesList()
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = setVoicesList
    }
  }, [])

  // TTS 재생 함수
  const playTTS = () => {
    if (isPlaying) {
      speechSynthesis.cancel() // 이미 재생 중인 TTS가 있다면 중지
      setIsPlaying(false)
    } else {
      // 텍스트를 부분적으로 나누어 처리
      const textParts = splitText(cartoonList[currentCartoonIndex].tts)

      // 첫 번째 텍스트 부분으로 시작
      speakTextPart(0, textParts)
      console.log(textParts)
    }
  }

  const splitText = (text: string): string[] => {
    const parts: string[] = text
      .split('.')
      .filter((part) => part.trim().length > 0)
      .map((part) => part.trim() + '.')
    return parts
  }

  const speakTextPart = (index: number, textParts: string[]): void => {
    if (index >= textParts.length) {
      setIsPlaying(false)
      setCurrentText('TTS 재생하여 설명을 들을 수 있어요 :)') // Clear the text when finished
      return
    }

    setCurrentText(textParts[index]) // Update the currently speaking text

    const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(
      textParts[index]
    )
    if (voices.length > 1) {
      utterance.voice = voices[1] // 두 번째 한국어 목소리 선택
    }
    utterance.onend = () => {
      speakTextPart(index + 1, textParts) // 다음 텍스트 부분으로 이동
    }
    speechSynthesis.speak(utterance)
    setIsPlaying(true)
  }

  useEffect(() => {
    return () => {
      if (isPlaying) {
        speechSynthesis.cancel()
        setIsPlaying(false)
        setCurrentText('TTS 재생하여 설명을 들을 수 있어요 :)')
      }
    }
  }, [isPlaying])

  // 이전 페이지로 가는 함수
  const goToPreviousCartoon = () => {
    if (isPlaying) {
      speechSynthesis.cancel()
      setCurrentText('TTS 재생하여 설명을 들을 수 있어요 :)')
    }
    const prevIndex = currentCartoonIndex > 0 ? currentCartoonIndex - 1 : 0
    changePage(prevIndex)
  }

  // 다음 페이지로 가는 함수
  const goToNextCartoon = () => {
    if (isPlaying) {
      speechSynthesis.cancel()
      setIsPlaying(false)
      setCurrentText('TTS 재생하여 설명을 들을 수 있어요 :)')
    }
    const nextIndex =
      currentCartoonIndex < cartoonList.length - 1
        ? currentCartoonIndex + 1
        : currentCartoonIndex
    changePage(nextIndex)
    if (nextIndex === cartoonList.length - 1) {
      setOpen(true) // 마지막 페이지에 도달했을 때 모달 열기
    }
  }

  const changePage = (newIndex: number) => {
    setAnimation('fadeOut')

    setTimeout(() => {
      setCurrentCartoonIndex(newIndex)
      setAnimation('fadeIn')
    }, 200) // 0.2초 후에 새 페이지 인덱스 설정 및 페이드인 애니메이션 적용
  }

  const goToQuiz = () => {
    navigate('/mainchild/stage/quiz/start')
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    'border-radius': '10px',
    p: 4,
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

      <div className={`${styles.cartoonContainer} ${styles[animation]}`}>
        <img
          src={cartoonList[currentCartoonIndex].pageImg}
          alt="만화"
          className={styles.cartoonImage}
        />
      </div>

      {/* 이전/다음 페이지 버튼 */}
      <button
        onClick={goToPreviousCartoon}
        disabled={currentCartoonIndex === 0}
        className={`${styles.previousButtonContainer} ${currentCartoonIndex === 0 ? styles.disabledButton : ''}`}
      >
        <img
          src={arrow}
          alt="이전"
          className={styles.imgsize}
          draggable="false"
        />
      </button>

      <button onClick={goToNextCartoon} className={styles.nextButtonContainer}>
        <img
          src={arrow}
          alt="다음"
          draggable="false"
          className={styles.imgsize}
        />
      </button>

      {/* 재생/중지 버튼 */}
      <div className={styles.ttsContainer}>
        <button onClick={playTTS} className={styles.audioButton}>
          <img
            src={isPlaying ? stop : play}
            alt={isPlaying ? '중지' : '재생'}
          />
        </button>
        <div className={styles.ttsText}>{currentText}</div>
      </div>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            ...style,
            display: 'flex', // 이미 style에 포함되어 있으면 생략 가능
            flexDirection: 'column', // 항목을 세로 방향으로 정렬
            alignItems: 'center', // 가로축 기준 중앙 정렬
            justifyContent: 'center', // 세로축 기준 중앙 정렬
            textAlign: 'center', // 텍스트 중앙 정렬
            width: '380px',
          }}
        >
          <Typography
            id="modal-modal-title"
            sx={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#585865',
              marginBottom: '70px',
              marginTop: '10px',
            }}
          >
            이제 퀴즈를 풀어 볼까요?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center', // 이제 버튼도 중앙 정렬됩니다.
              width: '100%', // 이 부분은 필요에 따라 조정 가능
              marginTop: 3, // Typography와 Button 사이의 간격 조정
            }}
          >
            <Button
              sx={{
                width: 300,
                height: '50px',
                fontSize: '18px',
                backgroundColor: '#0064FF',
                borderRadius: 3,
                color: 'white',
                marginBottom: '5px',
                fontWeight: 600,
                ':hover': {
                  backgroundColor: '#0056e3', // 호버 효과 추가
                },
              }}
              onClick={goToQuiz}
            >
              바로가기
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default Cartoon
