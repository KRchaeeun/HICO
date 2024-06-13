import React, { useState } from 'react'
import styles from './askWon.module.css'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import Button from '@mui/material/Button'
import { exchangeAmountState } from './MyPoint' // atom 정의를 임포트합니다.
import { useRecoilValue } from 'recoil'
import { ask } from '@/api/childPoint'
import AskComplete from '@/components/childwallet/AskComplete'
// 닫기 버튼
interface AskWonProps {
  onClose: () => void
  onConfirm: () => void
}
const Askwon: React.FC<AskWonProps> = ({ onClose, onConfirm }) => {
  const [modalState, setModalState] = useState('request')
  const [requestSuccess, setRequestSuccess] = useState(false)
  const exchangeAmount = useRecoilValue(exchangeAmountState)
  const navigate = useNavigate()

  const handleRequest = async () => {
    try {
      const response = await ask(
        exchangeAmount.balance,
        exchangeAmount.point,
        exchangeAmount.countryId
      )
      if (response.data.statusCode === 201) {
        setRequestSuccess(true)
      } else {
        console.error(
          'Request failed with status code:',
          response.data.statusCode
        )
      }
    } catch (error) {
      console.error('There was an error with the request:', error)
    }
  }

  if (requestSuccess) {
    return <AskComplete onClose={onClose} />
  }

  return (
    <div className={styles.container}>
      {/* 닫기 버튼 */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '15px',
          right: '20px',
        }}
      >
        <CloseRoundedIcon sx={{ fontSize: '35px' }} />
      </IconButton>

      {/* 메인 */}
      <div className={styles.materialContainer}>
        {/* 체크 아이콘 */}
        <div className={styles.icon}>
          <CheckCircleRoundedIcon style={{ color: '#0064FF', fontSize: 100 }} />
        </div>
        {/* 글씨 */}
        <div className={styles.text}>
          <div className={styles.maintext1}>부모님에게</div>
          <div className={styles.maintext2}>
            {exchangeAmount.point} {exchangeAmount.code} (
            {exchangeAmount.calculatedAmount}원)
          </div>
          <div className={styles.maintext3}> 환전을 요청할까요?</div>
          <div className={styles.subtext1}>
            환전 요청 금액을 다시 한번 확인해주세요!
          </div>
        </div>
        {/* 버튼 */}
        <div className={styles.button}>
          <Button
            variant="contained"
            disableElevation
            onClick={handleRequest}
            sx={{
              width: '100%',
              height: '55px',
              fontSize: '20px',
              backgroundColor: '#0064FF',
              borderRadius: '10px',
            }}
          >
            환전 요청하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Askwon
