import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import up from '../../assets/up.png'
import down from '../../assets/down.png'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import Lottie from 'lottie-react'
import usa from '../../assets/lottie/america.json'
import japan from '../../assets/lottie/japan.json'
import europe from '../../assets/lottie/europe.json'
import china from '../../assets/lottie/china.json'
import styles from './Currency.module.css'
import { useRecoilState } from 'recoil'
import { currencydetailState } from '@/state/currencyatoms'
import { today } from '@/api/currency'
import updown from '../../assets/updow.png'
import Navbar from '@/pages/mainparent/navbar'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import CurrencyDetail from './CurrencyDetail'

interface CurrencyData {
  amount: number
  basicRate: number
  exchangeRateId: number
  frType: string
  riseStatus: string
}

const Currency: React.FC = () => {
  const [countryId, setCountryId] = useRecoilState(currencydetailState)
  const [currencyData, setCurrencyData] = useState<CurrencyData[]>([])
  // const navigate = useNavigate()
  // 모달 오픈
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fetchTodayCurrency = async () => {
      try {
        const response = await today()
        // CurrencyData 형식으로 변환
        const currencyDataList: CurrencyData[] = response.data.data.map(
          (item: any) => ({
            amount: item.amount,
            basicRate: item.basicRate,
            exchangeRateId: item.exchangeRateId,
            frType: item.frType,
            riseStatus: item.riseStatus,
          })
        )
        setCurrencyData(currencyDataList)
      } catch (error) {
        console.error('API 요청 중 오류 발생: ', error)
      }
    }
    fetchTodayCurrency()
  }, [])

  const navigatToDetail = (Id: number) => {
    // 상태 업데이트 함수를 사용하여 countryId 상태를 변경
    setCountryId(Id)
    // 모달 오픈
    setOpen(true)
  }

  const shouldShowNavbar = location.pathname === '/currency'

  return (
    <div className={styles.main}>
      {shouldShowNavbar && <Navbar />}
      <div className={styles.currencycontainer}>
        <div className={styles.header}>실시간 환율</div>
        <div className={styles.subhead}>
          어제보다
          <img
            src={updown}
            alt="boy"
            style={{ height: '22px', marginTop: 3, marginLeft: '15px' }}
          />
        </div>
        <div className={styles.maindiv}>
          {/* Material UI: Lists */}
          <List sx={{ backgroundColor: 'transparent' }}>
            {currencyData.slice(0, 4).map((currency, index) => (
              <ListItem
                key={currency.exchangeRateId}
                disablePadding
                sx={{
                  minHeight: '130px',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  marginBottom: '15px',
                }}
              >
                <ListItemButton
                  onClick={() => navigatToDetail(index + 1)}
                  sx={{
                    minHeight: '120px',
                    backgroundColor: 'white',
                    borderRadius: '25px',
                    width: '100%',
                    '&:hover': { backgroundColor: '#DEE7FF' },
                  }}
                >
                  <div className={styles.col1}>
                    <div className={styles.countryInfo}>
                      {/* 나라 플래그 이미지 */}
                      <Lottie
                        animationData={
                          currency.frType === '미국 달러'
                            ? usa
                            : currency.frType === '일본 옌'
                              ? japan
                              : currency.frType === '유로'
                                ? europe
                                : currency.frType === '위안화'
                                  ? china
                                  : null // 기본값 혹은 일치하는 코드가 없을 경우
                        }
                        style={{
                          width: '4.5vw',
                          height: '4.5vw',
                          marginRight: '6px',
                        }}
                      />
                      {/* 나라 이름 */}
                      <div className={styles.row0}>
                        {currency.frType === '미국 달러' && '미국 달러 USD'}
                      </div>
                      <div className={styles.row0}>
                        {currency.frType === '일본 옌' && '일본 엔 JPN'}
                      </div>
                      <div className={styles.row0}>
                        {currency.frType === '유로' && '유럽 유로 EUR'}
                      </div>
                      <div className={styles.row0}>
                        {currency.frType === '위안화' && '중국 위안 CHN'}
                      </div>
                    </div>
                    <div className={styles.rightContainer}>
                      {/*<div className={styles.col2}>*/}
                      {/*  /!* 기본 환율 *!/*/}
                      {/*  <div className={styles.row1}>*/}
                      {/*    {currency.basicRate}원/!* 실시간 환율 *!/*/}
                      {/*    <div*/}
                      {/*      className={*/}
                      {/*        currency.riseStatus === 'DECREASE'*/}
                      {/*          ? styles.row2blue*/}
                      {/*          : styles.row2red*/}
                      {/*      }*/}
                      {/*    >*/}
                      {/*      {currency.amount}원*/}
                      {/*      {currency.riseStatus === 'DECREASE' && (*/}
                      {/*        <img*/}
                      {/*          src={down}*/}
                      {/*          alt="down"*/}
                      {/*          style={{*/}
                      {/*            height: '1.6vw',*/}
                      {/*            marginLeft: '4px',*/}
                      {/*            marginTop: '2px',*/}
                      {/*          }}*/}
                      {/*        />*/}
                      {/*      )}*/}
                      {/*      {currency.riseStatus === 'INCREASE' && (*/}
                      {/*        <img*/}
                      {/*          src={up}*/}
                      {/*          alt="up"*/}
                      {/*          style={{*/}
                      {/*            height: '1.6vw',*/}
                      {/*            marginLeft: '4px',*/}
                      {/*            marginTop: '2px',*/}
                      {/*          }}*/}
                      {/*        />*/}
                      {/*      )}*/}
                      {/*    </div>*/}
                      {/*  </div>*/}
                      {/*</div>*/}

                      <div className={styles.col2}>
                        {/* 기본 환율 */}
                        <div className={styles.row1}>
                          {currency.basicRate}원
                        </div>
                        {/* 실시간 환율을 위한 새로운 div 추가 */}
                        <div className={styles.rightAlignContainer}>
                          <div
                            className={
                              currency.riseStatus === 'DECREASE'
                                ? styles.row2blue
                                : styles.row2red
                            }
                          >
                            {currency.amount}원
                            {currency.riseStatus === 'DECREASE' && (
                              <img
                                src={down}
                                alt="down"
                                style={{
                                  height: '1.6vw',
                                  marginLeft: '4px',
                                  marginTop: '2px',
                                }}
                              />
                            )}
                            {currency.riseStatus === 'INCREASE' && (
                              <img
                                src={up}
                                alt="up"
                                style={{
                                  height: '1.6vw',
                                  marginLeft: '4px',
                                  marginTop: '2px',
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <ArrowForwardIosRoundedIcon
                        sx={{ fontSize: '35px', color: '#C2C2C9' }}
                      />
                    </div>
                  </div>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      {/* world map으로 이동 모달 */}
      <div className={styles.modal}>
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
              width: '80%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* 모달 닫기 버튼 */}
            <CurrencyDetail open={open} setOpen={setOpen} />{' '}
            {/* open 상태와 모달 닫는 함수 전달 */}
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default Currency
