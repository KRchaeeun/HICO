import React from 'react'
import styles from './signupcomplete.module.css'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import Button from '@mui/material/Button'

const SignupComplete: React.FC = () => {
  return (
    <div className={styles.materialContainer}>
      <div className={styles.box}>
        <div className={styles.icon}>
          <CheckCircleRoundedIcon style={{ color: '#0064FF', fontSize: 100 }} />
        </div>
        <div className={styles.subtitle}>회원가입을 완료했습니다.</div>
        <div className={styles.title1}>환영합니다!</div>
        <div className={styles.title2}>즐거운 여행을 시작하세요 😀</div>

        {/* 회원가입 완료 버튼 */}
        <div className={styles.button}>
          <Button
            variant="contained"
            disableElevation
            sx={{
              width: '100%',
              height: '60px',
              fontSize: '22px',
              backgroundColor: '#0064FF',
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignupComplete
