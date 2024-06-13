import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import usalottie from '../../assets/lottie/america.json'
import japanlottie from '../../assets/lottie/japan.json'
import europelottie from '../../assets/lottie/europe.json'
import chinalottie from '../../assets/lottie/china.json'
import styles from './mypoint.module.css'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import AskWon from './AskWon'
import AskComplete from './AskComplete'
import { useNavigate } from 'react-router-dom'
import { point } from '@/api/childPoint'
import Currency from '@/components/parentcurrency/Currency'
import { atom, useSetRecoilState, useRecoilValue } from 'recoil'
import { childAccountSelector } from '@/state/AccountSelectors'
import HistoryDetail from './HistoryDetail'
import currency from "@/components/parentcurrency/Currency";

export const exchangeAmountState = atom({
  key: 'exchangeAmountState', // 고유한 키
  default: {
    point: 0,
    code: '',
    calculatedAmount: '',
    balance: 0,
    countryId: 0,
  }, // 기본값
})

interface CurrencyData {
  countryId: number
  code: string
  frType: string
  point: number
  basicRate: number
}

const Mypoint: React.FC = () => {
  const userName = localStorage.getItem('userName')
  const [frType, setFrType] = useState('');
  const [frCode, setFrCode] = useState('');
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [modalContent, setModalContent] = useState('ask')
  const [totalAmount, setTotalAmount] = useState(0)
  const [currencyData, setCurrencyData] = useState<CurrencyData[]>([])
  // history open
  const [historyOpen, sethistoryOpen] = useState(false)
  const setExchangeAmount = useSetRecoilState(exchangeAmountState)

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await point()
        setCurrencyData(response.data.data)
      } catch (error) {
        console.error('Error fetching currency data:', error)
      }
    }

    fetchCurrencyData()
  }, [])

  useEffect(() => {
    const total = currencyData.reduce(
      (acc, currency) => acc + Math.floor(currency.point * currency.basicRate),
      0
    )
    setTotalAmount(total)
  }, [currencyData])

  // 환전 요청 핸들러
  const handleExchangeRequest = (currency: CurrencyData) => {
    sethistoryOpen(false)
    const calculatedAmount = Math.floor(
      currency.point * currency.basicRate
    ).toLocaleString('ko-KR')
    setExchangeAmount({
      point: currency.point,
      code: currency.code,
      balance: Math.floor(currency.point * currency.basicRate),
      calculatedAmount,
      countryId: currency.countryId,
    })
    setOpen(true) // Modal을 열어 AskWon 컴포넌트를 보여줌
  }

  const handleClose = () => {
    setOpen(false)
    setModalContent('ask') // 모달을 닫을 때 항상 'ask' 상태로 리셋
  }
  const handleHistoryClose = () => {
    sethistoryOpen(false)
  }

  const handleComplete = () => {
    setModalContent('complete')
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow:
      '-6px 6px 10px rgba(0, 0, 0, 0.364), 4px 4px 8px rgba(0, 0, 0, 0.121)',
  }

  const currencyButton = () => {
    navigate('/currency/detail')
  }

  function scrollToAnchor(anchorId: string) {
    const anchorElement = document.getElementById(anchorId)
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
  const [countryId, setCountryId] = useState(0)
  function OpenModal(currency: CurrencyData) {
    setCountryId(currency.countryId);
    setFrType(currency.frType);
    setFrCode(currency.code)
    sethistoryOpen(true);
  }

  return (
    <div className={styles.container}>
      {/* 메인1 */}
      <div className={styles.pointtitle}>획득 포인트</div>
      <div className={styles.main}>
        <div className={styles.horizontal} >
          <div className={styles.possibletext}>
            {userName}님의 환전 가능 금액
          </div>
          <div className={styles.possiblemoney}>
            총 {totalAmount.toLocaleString('ko-KR')}원
          </div>
        </div>

        <div className={styles.line}></div>

        {/* 환율 정보를 동적으로 렌더링 */}
        {currencyData.map((currency) => (
          <div key={currency.countryId} className={styles.horizontal2}>
            <div onClick={() => OpenModal(currency)} className={styles.box}>
            <div className={styles.country}>
              {/* 국가 Lottie */}
              <Lottie
                animationData={
                  currency.code === 'USD'
                    ? usalottie
                    : currency.code === 'JPY'
                      ? japanlottie
                      : currency.code === 'EUR'
                        ? europelottie
                        : currency.code === 'CNH'
                          ? chinalottie
                          : null // 기본값 혹은 일치하는 코드가 없을 경우
                }
                style={{ width: '4.5vw', height: '4.5vw', marginRight: '5px' }}
              />
              {currency.frType}
            </div>
            <div className={styles.horizontal1}>
              <div className={styles.context}>
                보유 {currency.point} {currency.code}
              </div>
              <div className={styles.money}>
                {Math.floor(currency.point * currency.basicRate).toLocaleString(
                  'ko-KR'
                )}
                원
              </div>
            </div>

            <div className={styles.smaller}>
              <div className={styles.smallertext}>
                {currency.point}
                {currency.code}
              </div>
              <div className={styles.smallertext}>
                {Math.floor(currency.point * currency.basicRate).toLocaleString(
                  'ko-KR'
                )}
                원
              </div>
            </div>
            </div>
            <div className={styles.button}>
              <Button
                variant="contained"
                disableElevation
                disabled={currency.point === 0}
                onClick={(event) => {
                  // Prevent the click event from bubbling up to the parent elements
                  event.stopPropagation();
                  handleExchangeRequest(currency);
                }}
                sx={{
                  width: 'clamp(100px, 15vw, 140px)',
                  height: 'clamp(35px, 6vw, 45px)',
                  fontSize: 'clamp(14px, 1.7vw, 17px)',
                  backgroundColor: currency.point === 0 ? '#bdc6d7' : '#0064FF', // currency.point가 0일 때 회색, 아닐 때 파란색
                  borderRadius: 2,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: currency.point === 0 ? '#bdc6d7' : '#0056b3', // 호버 시 스타일 조정
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#bdc6d7', // 비활성화 상태일 때의 배경색
                    color: '#ffffff', // 비활성화 상태일 때의 글자색
                  },
                }}
              >
                환전 요청
              </Button>
            </div>
            {/* 환전요청 모달 */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="ask-won-modal-title"
              aria-describedby="ask-won-modal-description"
            >
              <Box sx={style}>
                {modalContent === 'ask' ? (
                  <AskWon onConfirm={handleComplete} onClose={handleClose} />
                ) : (
                  <AskComplete onClose={handleClose} />
                )}
              </Box>
            </Modal>
          </div>
        ))}
      </div>

      <div className={`${styles.main} ${styles.help}`}>
        <Link
          onClick={() => scrollToAnchor('currency')}
          className="link-pointer"
          sx={{
            color: '#bdc6d7;',
            textDecorationColor: '#bdc6d7',
          }}
        >
          실시간 환율 확인하기
        </Link>
      </div>

      <div id="currency" className={styles.main2}>
        <Currency />
      </div>

      {/* 히스토리 확인 모달 */}
      <Modal
        open={historyOpen}
        onClose={handleHistoryClose}
        aria-labelledby="ask-won-modal-title"
        aria-describedby="ask-won-modal-description"
      >
        <Box sx={style}>
          <HistoryDetail open={open} setOpen={setOpen} countryId={countryId} frCode={frCode} frType={frType}/>{' '}
        </Box>
      </Modal>
    </div>
  )
}

export default Mypoint
