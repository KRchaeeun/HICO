import React from 'react'
import styles from './completeaccount.module.css'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import Button from '@mui/material/Button'
import logoImage from '../../assets/logo.png'

const CompleteAccount: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* 로고 이미지 */}
      <img
        src={logoImage}
        alt="LOGO"
        style={{
          height: '80px',
          marginTop: '30px',
          marginRight: '320px',
          marginBottom: '20px',
        }}
      />
      {/* 메인 */}
      <div className={styles.materialContainer}>
        {/* 체크 아이콘 */}
        <div className={styles.icon}>
          <CheckCircleRoundedIcon style={{ color: '#0064FF', fontSize: 100 }} />
        </div>
        {/* 글씨 */}
        <div className={styles.text}>
          <div className={styles.maintext1}>계좌등록을 완료했어요!</div>
          <div className={styles.subtext1}>이제 History Coin,히코를</div>
          <div className={styles.subtext2}>모두 즐길 수 있어요!</div>
        </div>
        {/* 버튼 */}
        <div className={styles.button}>
          <Button
            variant="contained"
            disableElevation
            sx={{
              width: '100%',
              height: '55px',
              fontSize: '20px',
              backgroundColor: '#0064FF',
              borderRadius: '15px',
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompleteAccount
