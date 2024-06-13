import React from 'react'
import styles from '@/components/childwallet/AskComplete.module.css'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import Button from '@mui/material/Button'

interface AskCompleteProps {
  onClose: () => void
}

const AskComplete: React.FC<AskCompleteProps> = ({ onClose }) => {
  const handleConfirm = () => {
    onClose()
    window.location.reload()
  }

  return (
    <div className={styles.container}>
      {/* 메인 */}
      <div className={styles.materialContainer}>
        {/* 체크 아이콘 */}
        <div className={styles.icon}>
          <CheckCircleRoundedIcon style={{ color: '#0064FF', fontSize: 100 }} />
        </div>
        {/* 글씨 */}
        <div className={styles.text}>
          <div className={styles.maintext1}>부모님에게</div>
          <div className={styles.maintext3}>환전을 요청했어요!</div>
          <div className={styles.subtext1}>환전이 완료되면 알려드릴게요!</div>
        </div>
        {/* 버튼 */}
        <div className={styles.button}>
          <Button
            variant="contained"
            disableElevation
            onClick={handleConfirm}
            sx={{
              width: '100%',
              height: '55px',
              fontSize: '20px',
              backgroundColor: '#0064FF',
              borderRadius: '10px',
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AskComplete
