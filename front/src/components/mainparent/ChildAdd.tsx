import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import styles from './childadd.module.css'
import { code } from '@/api/parent'

// 닫기 버튼
interface ChildAddProps {
  handleClose: () => void
}

const ChildAdd: React.FC<ChildAddProps> = ({ handleClose }) => {
  const [registCode, setRegistCode] = useState('')
  useEffect(() => {
    // 비동기 함수 정의
    const fetchCode = async () => {
      try {
        const response = await code()
        // console.log(response.data)
        // 초대코드 업데이트
        setRegistCode(response.data.data)
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error)
      }
    }

    // 비동기 함수 실행
    fetchCode()
  }, []) // 빈 배열을 넣어서 컴포넌트 마운트 시에만 실행되도록 함

  // 코드 클립보드 저장 함수
  const handleCopyCode = () => {
    navigator.clipboard.writeText(registCode).then(
      () => {
        alert('코드가 클립보드에 복사되었습니다.')
      },
      (err) => {
        console.error('클립보드에 복사를 실패했습니다: ', err)
      }
    )
  }
  return (
    <div className={styles.container}>
      {/* 닫기 버튼 */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: '15px',
          right: '20px',
        }}
      >
        <CloseRoundedIcon sx={{ fontSize: '35px' }} />
      </IconButton>

      {/* 설명 */}
      <div className={styles.maintext}>아이 등록 초대 코드</div>
      <div className={styles.sublayout}>
        <div className={styles.subtext}>
          아이 등록을 위한 초대코드를 만들었어요!
        </div>
        <div className={styles.subtext}>
          아이 계정에서 코드를 입려해 보세요.
        </div>
      </div>

      {/* 초대코드 */}
      <div className={styles.invitation}>
        <div className={styles.invitationmain}>
          <div className={styles.invitetext}>내 초대코드</div>
          <div className={styles.invitecode}>{registCode}</div>
        </div>

        {/* 코드 복사 버튼 */}
        <div className="buttoncopy">
          <Button
            variant="contained"
            disableElevation
            sx={{
              width: '100%',
              height: '40px',
              fontSize: '14px',
              marginTop: '25px',
              paddingLeft: '95px',
              paddingRight: '95px',
              backgroundColor: '#0064FF',
              borderRadius: '30px',
              fontWeight: 'bold',
            }}
            onClick={handleCopyCode}
          >
            내 코드 복사하기
          </Button>
        </div>

        {/* 코드 카카오톡 공유 */}
        <div className="share">
          <Button
            variant="contained"
            disableElevation
            sx={{
              width: '100%',
              height: '40px',
              fontSize: '14px',
              marginTop: '14px',
              marginBottom: '5px',
              paddingLeft: '95px',
              paddingRight: '95px',
              backgroundColor: '#FAE100',
              borderRadius: '30px',
              fontWeight: 'bold',
              color: '#3B1D1D',
            }}
            onClick={handleCopyCode}
          >
            카카오톡 공유하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChildAdd
