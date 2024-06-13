import React, { startTransition } from 'react'
import styles from './sendingcomplete.module.css'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import Button from '@mui/material/Button'
import { useLocation, useNavigate } from 'react-router-dom'

interface frTran {
  frTranId: number
  balance: number
  countryId: number
  frBalance: number
  code: string
  createTime: string
  childId: number
  name: string
  transacted: boolean
}

const Sendingcomplete: React.FC = () => {
  const location = useLocation()
  const { transaction }: { transaction?: frTran } = location.state || {}

  const navigate = useNavigate()
  const okClick = () => {
    startTransition(() => {
      navigate('/parentwallet/request')
      window.location.reload() // 페이지 이동 후 자동으로 새로고침
    })
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
          <div className={styles.maintext1}>{transaction?.name}님에게</div>
          <div className={styles.maintext2}>
            {Number(transaction?.balance).toLocaleString()}원을 보냈어요!
          </div>
          <div className={styles.subtext}>수수료는 히코가 냈어요!</div>
        </div>
        {/* 버튼 */}
        <div className={styles.button}>
          <Button
            onClick={okClick}
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

export default Sendingcomplete
