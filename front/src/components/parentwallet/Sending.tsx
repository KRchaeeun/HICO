import React, { useState, useEffect } from 'react'
import styles from './sending.module.css'
import Button from '@mui/material/Button'
import CircleIcon from '@mui/icons-material/Circle'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded'
import { useLocation, useNavigate } from 'react-router-dom'
import { startTransition } from 'react'
import { useRecoilState } from 'recoil'
import { postBalance } from '@/api/parent'

// interface AccountData {
//   frTranList: frTran[]
// }

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

const Sending: React.FC = () => {
  // 입력된 비밀번호 길이를 추적하는 상태
  const [password, setPassword] = useState<string>('')
  const location = useLocation()
  const { transaction }: { transaction?: frTran } = location.state || {}
  const navigate = useNavigate()

  const myWallet = () => {
    startTransition(() => {
      navigate('/parentwallet/request')
    })
  }

  // 비밀번호 입력 핸들러
  const handlePasswordInput = (number: number) => {
    // 비밀번호 길이가 4 이하일 때만 업데이트
    if (password.length < 4) {
      setPassword(password + number.toString())
    }
  }

  // 비밀번호 삭제 핸들러
  const handleDelete = () => {
    if (password.length > 0) {
      setPassword(password.slice(0, -1))
    }
  }

  // 송금하기
  const transferMoney = async () => {
    try {
      await postBalance(transaction?.frTranId || 0, password)
      // 송금 성공 시 처리
      console.log('송금이 완료되었습니다.')
      // 송금 완료 화면으로 정보 넘김
      startTransition(() => {
        navigate('/parentwallet/complete', { state: { transaction } })
      })
    } catch (error) {
      console.error('송금 중 오류 발생:', error)
      alert('비밀번호가 올바르지 않습니다.')
    }
  }

  // 비밀번호 4자리 누르자마자 자동 송금
  useEffect(() => {
    // 비밀번호가 4글자가 되면 자동으로 송금 함수 호출
    if (password.length === 4) {
      transferMoney()
    }
  }, [password])

  return (
    <div className={styles.container}>
      <div className={styles.walletTitle}>
        {/* 마이지갑으로 돌아가는 버튼 */}
        <Button
          disableElevation
          sx={{
            color: '#585865',
            fontWeight: 'bold',
            width: '150px',
            height: '50px',
            paddingTop: '10px',
          }}
        >
          <KeyboardBackspaceRoundedIcon
            sx={{
              fontSize: '30px',
              paddingBottom: '4px',
              paddingRight: '10px',
            }}
          />
          <div onClick={myWallet} className={styles.navigatetext}>
            마이 지갑
          </div>
        </Button>
      </div>
      <div className={styles.walletTitle2}>
        {/* 마이지갑으로 돌아가는 버튼 */}
        <Button
          disableElevation
          sx={{
            color: '#585865',
            fontWeight: 'bold',
            width: '70px',
            height: '60px',
            paddingTop: '10px',
          }}
        >
          <KeyboardBackspaceRoundedIcon
            sx={{
              fontSize: '35px',
              paddingBottom: '7px',
              paddingRight: '10px',
            }}
          />
        </Button>
      </div>

      {/* 메인 */}
      <div className={styles.materialContainer}>
        <div className={styles.text}>
          <div className={styles.main1}>{transaction?.name}님 에게</div>
          <div className={styles.main2}>
            {Number(transaction?.balance).toLocaleString()}원을 송금할까요?
          </div>
          <div className={styles.sub}>비밀번호를 입력해 주세요.</div>
        </div>

        {/* 비밀번호 입력 아이콘 */}
        <div className={styles.icon}>
          {[...Array(4)].map((_, index) => (
            <CircleIcon
              key={index}
              sx={{
                fontSize: '30px',
                color: index < password.length ? '#fff' : '#6C6C7D',
                marginLeft: index > 0 ? '50px' : '0px',
              }}
            />
          ))}
        </div>

        {/* 키패드 번호 */}
        <div className={styles.numberfirst}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'delete'].map(
            (number, index, arr) => (
              <Button
                key={index}
                disableElevation
                onClick={() => {
                  if (number === 'delete') {
                    handleDelete()
                  } else if (typeof number === 'number') {
                    handlePasswordInput(number)
                  }
                }}
                sx={{
                  color: 'white',
                  fontSize: '35px',
                  fontWeight: 'bold',
                  width: '130px',
                  height: '90px',
                  margin:
                    arr.length - 1 === index && number === 0 ? '0 0 0 0' : '0',
                  marginLeft:
                    index === 9 ? '190px' : index % 3 === 0 ? '60px' : '0',
                }}
              >
                {number === 'delete' ? (
                  <KeyboardBackspaceRoundedIcon sx={{ fontSize: '40px' }} />
                ) : (
                  number
                )}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Sending
