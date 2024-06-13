import React, { useState } from 'react'
import styles from './createaccount.module.css'
import Button from '@mui/material/Button'
import CircleIcon from '@mui/icons-material/Circle'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded'
// import { useNavigate } from 'react-router-dom'
import { accountState } from './RegisterAccount'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { register } from '@/api/account'

const RegisterAccountPassword: React.FC = () => {
  const userName = localStorage.getItem('userName')

  // 입력된 비밀번호 길이를 추적하는 상태
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const accountValue = useRecoilValue(accountState)

  const handlePasswordInput = (number: number) => {
    if (password.length < 4) {
      const newPassword = password + number.toString()
      setPassword(newPassword)

      if (newPassword.length === 4) {
        register(accountValue.accountNo, newPassword)
          .then((response) => {
            if (response.data.statusCode === 200) {
              alert('정상적으로 등록되었습니다.')
              console.log(localStorage.getItem('userRole'))
              if (localStorage.getItem('userRole') === 'CHILD') {
                navigate('/mainchild')
              } else if (localStorage.getItem('userRole') === 'PARENT') {
                navigate('/mainparent')
              }
            } else {
              alert('등록에 실패하였습니다.')
            }
          })
          .catch((error) => {
            console.error('Registration failed', error)
            alert('등록 과정에서 오류가 발생하였습니다.')
          })
      }
    }
  }

  const handleDelete = () => {
    if (password.length > 0) {
      const newPassword = password.slice(0, -1)
      setPassword(newPassword)
    }
  }

  // const navigate = useNavigate()
  // const handleButtonClick = () => {
  //   navigate('/parentwallet/complete')
  // }
  // const styleObj = {
  //   border: '1px solid black',
  //   padding: '10px',
  //   margin: '10px',
  // }
  // const [pin, setPin] = useState<string>('') // State to store the pin

  // const handleKeyPress = (number: string) => {
  //   if (pin.length < 4) {
  //     setPin(pin + number)
  //   }
  // }

  // const handleDelete = () => {
  //   setPin(pin.slice(0, -1)) // Remove the last digit
  // }

  // const keypadStyle = {
  //   display: 'grid',
  //   gridTemplateColumns: 'repeat(3, 1fr)',
  //   gap: '10px',
  // }

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
          <div className={styles.navigatetext}>계좌등록</div>
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
          <div className={styles.main1}>{userName}님,한국은행 계좌를</div>
          <div className={styles.main2}>원클릭으로 만들 수 있어요!</div>
          <div className={styles.sub}>계좌 비밀번호를 입력해 주세요.</div>
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
    // <div style={styleObj}>
    //   <div style={styleObj}>
    //     <p>내 아이에게 3,000원을 송금할까요?</p>
    //     <p>비밀번호를 입력해주세요.</p>
    //     <p>PIN: {pin}</p> {/* Display the entered pin here */}
    //   </div>
    //   <div className="pin-inputs" style={styleObj}>
    //     {/* Replace this with your actual pin inputs, or display pin */}
    //     {Array.from({ length: 4 }).map((_, index) => (
    //       <span key={index}>{pin[index] || '*'}</span> // This will display the pin or a placeholder
    //     ))}
    //   </div>
    //   <div className="keypad" style={keypadStyle}>
    //     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'delete', 0].map((number) =>
    //       number === 'delete' ? (
    //         <button key={number} onClick={handleDelete}>
    //           ←
    //         </button>
    //       ) : (
    //         <button
    //           key={number}
    //           onClick={() => handleKeyPress(number.toString())}
    //         >
    //           {number}
    //         </button>
    //       )
    //     )}
    //   </div>
    //   <button onClick={handleButtonClick}>송금하기</button>
    // </div>
  )
}

export default RegisterAccountPassword
