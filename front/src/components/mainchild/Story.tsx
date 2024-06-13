import React, { useState, startTransition } from 'react'
import styles from './Story.module.css'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useNavigate } from 'react-router-dom'
import { tutorial } from '@/api/child'
import timeMachine from '@/assets/storytimemachine.png'
import nextbtn from '@/assets/storynext.png'
import prevbtn from '@/assets/storyprev.png'
const storyBackgroundLab = require('@/assets/lab.png')
const storyspaceship = require('@/assets/spaceship.png')
const storyworldmap = require('@/assets/globe.PNG')

type Storyline = {
  id: number
  text: string
  image: string // 이미지 URL
  isgrandpa: number
  isgrandchild: number
  speaker: number
}
const stories: Storyline[] = [
  {
    id: 0,
    text: '할아버지 저 왔어요 !',
    image: storyBackgroundLab,
    isgrandpa: 0,
    isgrandchild: 1,
    speaker: 0,
  },
  {
    id: 1,
    text: '아이구 내 똥강아지 왔구나 보고 싶었단다',
    image: storyBackgroundLab,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 1,
  },
  {
    id: 2,
    text: '할아버지 저도 보고 싶었어요! <br> 할아버지 저건 뭐예요?',
    image: storyBackgroundLab,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 0,
  },
  {
    id: 3,
    text: '아 저거? 저건 내가 요즘 개발중인 타임머신이란다. <br> 아직 완성된게 아니니 절대 만지지 말거라.',
    image: storyBackgroundLab,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 1,
  },
  {
    id: 4,
    text: '잠시 화장실에 다녀올테니 여기 앉아서 기다리거라',
    image: storyBackgroundLab,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 1,
  },
  {
    id: 5,
    text: '우와 멋지다... 그냥 잠깐 구경하는건 괜찮겠지? <br> 오 여기로 들어가는 건가?',
    image: storyBackgroundLab,
    isgrandpa: 0,
    isgrandchild: 1,
    speaker: 0,
  },
  {
    id: 6,
    text: '우우우웅 우우웅',
    image: storyBackgroundLab,
    isgrandpa: 0,
    isgrandchild: 1,
    speaker: 2,
  },
  {
    id: 7,
    text: '할아버지 빨리 와보세요! <br> 이상한 소리가 나요!!',
    image: storyBackgroundLab,
    isgrandpa: 0,
    isgrandchild: 1,
    speaker: 0,
  },
  {
    id: 8,
    text: '안돼 !<br> 아가 !',
    image: storyBackgroundLab,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 1,
  },
  {
    id: 9,
    text: '아이구 이녀석아.. 만지면 안된다니까...',
    image: storyspaceship,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 1,
  },
  {
    id: 10,
    text: '죄송해요 할아버지 <br>잠깐 구경하는건 괜찮을 줄 알았어요',
    image: storyspaceship,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 0,
  },
  {
    id: 11,
    text: '아휴 넌 어릴때부터 나를 닮아 아주 호기심이 많았지 <br> 이렇게 될 수 있다고 생각했단다',
    image: storyspaceship,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 1,
  },
  {
    id: 12,
    text: '할아버지 우리는 이제 어디로 가는거에요?',
    image: storyspaceship,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 0,
  },
  {
    id: 13,
    text: '과거의 지구로 가고 있는 것 같구나. 자! 저길 봐라 아가',
    image: storyspaceship,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 1,
  },
  {
    id: 14,
    text: '우와 ! 너무 예뻐요 !',
    image: storyworldmap,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 0,
  },
  {
    id: 15,
    text: '지금 예쁜게 중요한게 아니란다 아가... <br> 우리는 여기서 연료를 얻어서 집으로 돌아가야 해',
    image: storyworldmap,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 1,
  },
  {
    id: 16,
    text: '연료요? <br> 연료를 어디서 얻을 수 있어요?',
    image: storyworldmap,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 0,
  },
  {
    id: 17,
    text: '시간을 지키는 요정들에게 부탁하면 된단다',
    image: storyworldmap,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 1,
  },
  {
    id: 18,
    text: '시간을 지키는 요정들이요?',
    image: storyworldmap,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 0,
  },
  {
    id: 19,
    text: '우리처럼 타임머신을 타고 와서 <br> 역사를 바꾸려고 하는 사람들이 있단다.',
    image: storyworldmap,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 1,
  },
  {
    id: 20,
    text: '그런 사람들을 막기위해 <br> 시간의 요정들이 과거 시간을 지키게 되었단다.',
    image: storyworldmap,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 1,
  },
  {
    id: 21,
    text: '요정들이 내는 문제를 맞추고 연료를 받아서 <br> 집으로 돌아가자꾸나! ',
    image: storyworldmap,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 1,
  },
  {
    id: 22,
    text: '요정들이 내는 문제를 맞추고 연료를 받아서 집으로 돌아가자꾸나! ',
    image: storyworldmap,
    isgrandpa: 1,
    isgrandchild: 1,
    speaker: 1,
  },
]
const Story: React.FC = () => {
  const navigate = useNavigate()
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  // 모달 오픈
  const [open, setOpen] = useState(false)

  const goToPreviousStory = () => {
    setCurrentStoryIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const goToNextStory = () => {
    if (currentStoryIndex === stories.length - 2) {
      // currentStoryIndex가 stories의 마지막 인덱스일 때
      setOpen(true)
    } else {
      setCurrentStoryIndex((prev) => prev + 1)
    }
  }
  const goToworldmap = async () => {
    try {
      // API 호출
      const response = await tutorial() // tutorial 함수는 API 호출하는 함수로 가정
      console.log(response)
      // API 호출이 성공하면 페이지 이동
      if (response.data.statusCode === 200) {
        // 성공일 때
        navigate('/mainchild/worldmap') // 페이지 이동
        window.location.reload() // 페이지 새로고침
      } else {
        // API 호출이 실패했을 때의 처리
      }
    } catch (error) {
      // 에러 처리
      console.error('API 호출 중 에러 발생:', error)
      // 에러 처리 코드 작성
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
  }

  return (
    <div className={styles.storyContainer}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${stories[currentStoryIndex].image})` }}
      />
      <div>
        {stories[currentStoryIndex].isgrandpa === 1 && (
          <div
            className={`${styles.grandpa} ${stories[currentStoryIndex].speaker === 0 ? styles.grayscale : ''}`}
          />
        )}
      </div>
      <div>
        {stories[currentStoryIndex].isgrandchild === 1 && (
          <div
            className={`${styles.boy} ${stories[currentStoryIndex].speaker === 1 ? styles.grayscale : ''}`}
          />
        )}
      </div>
      <div className={styles.doughnut}>
        {currentStoryIndex < 8 ? (
          <div className={styles.timemachine}>
            <img src={timeMachine} alt="time machine" />
          </div>
        ) : currentStoryIndex === 8 ? (
          <div className={`${styles.timemachine} ${styles.animateup}`}>
            <img src={timeMachine} alt="time machine" />
          </div>
        ) : null}
      </div>

      <div className={styles.storyNavigation}>
        <div className={styles.textfield}>
          {stories[currentStoryIndex].text
            .split('<br>')
            .map((line, index, array) =>
              index < array.length - 1 ? (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ) : (
                <span key={index}>{line}</span>
              )
            )}
          {currentStoryIndex !== 0 && (
            <Button
              onClick={goToPreviousStory}
              className={styles.prevButton} // 왼쪽 하단 버튼 클래스 추가
            >
              <img
                src={prevbtn}
                alt="Previous"
                className={styles.ButtonImage}
              />
            </Button>
          )}
          <Button
            onClick={goToNextStory}
            disabled={currentStoryIndex === stories.length - 1}
            className={styles.nextButton} // 오른쪽 하단 버튼 클래스 추가
          >
            <img src={nextbtn} alt="Next" className={styles.ButtonImage} />
          </Button>
        </div>
      </div>
      {/* world map으로 이동 모달 */}
      <div>
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
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              연료를 얻으러 가볼까요?
            </Typography>
            {/* Removed the Typography that was not being used */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center', // This centers the button horizontally
                mt: 2, // Adds margin-top for spacing
              }}
            >
              <Button
                sx={{
                  marginRight: 3,
                  marginTop: 1.2,
                  width: 110,
                  height: '42px',
                  fontSize: '17px',
                  backgroundColor: '#0064FF',
                  borderRadius: 3,
                  color: 'white',
                  fontWeight: 600,
                }}
                onClick={goToworldmap}
              >
                이동하기
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default Story
