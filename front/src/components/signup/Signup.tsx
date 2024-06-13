import React, { useState, startTransition } from 'react'
import styles from './signup.module.css'
import { useNavigate } from 'react-router-dom'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateField } from '@mui/x-date-pickers/DateField'
import { Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import dayjs from 'dayjs'
import { join } from '@/api/member'
import logo from '../../assets/logo.png'

function Signup() {
  const navigate = useNavigate()

  const loginClick = () => {
    startTransition(() => {
      navigate('/')
    })
  }

  // 계좌 등록 화면으로 이동해야 한다. 경로 변경 필요!
  const completeClick = async () => {
    //날짜형식 변경
    const birthDateformated = birthDate.format('YYYY-MM-DD')
    console.log(
      'signup 입력 변수 확인->api에 이 변수들 post',
      role,
      gender,
      name,
      email,
      password,
      confirm,
      code,
      birthDateformated
    )
    try {
      const response = await join(
        email,
        password,
        name,
        birthDateformated,
        gender,
        role,
        code
      )
      console.log(response.data) // 요청 성공 시 응답 데이터 로깅
      alert('화원가입이 완료 되었습니다.')
      // 성공 처리 로직...
    } catch (error) {
      console.error(error) // 에러 로깅
      // 에러 처리 로직...
    }
    // // api 함수에 보내기
    startTransition(() => {
      navigate('/')
    })
  }
  // 이메일
  const [email, setEmail] = useState('')
  // 비밀번호
  const [password, setPassword] = useState('')
  //비밀번호 확인
  const [confirm, setConfirm] = useState('')
  //이름
  const [name, setName] = useState('')
  //생년월일
  const [birthDate, setBirthDate] = useState(dayjs('2024-03-26'))
  // 성별 판별
  const [gender, setGender] = useState('female')
  // 부모, 아이 역할
  const [role, setRole] = useState('PARENT')
  // 초대 코드
  const [code, setCode] = useState('')

  return (
    <div>
      <div className={styles.logoContainer}>
        <img src={logo} alt="로고" />
      </div>
      <div className={styles.materialContainer}>
        <div className={styles.thirdbox}></div>
        <div className={styles.secondbox}></div>
        <div className={styles.box}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>회원가입</div>
            {/* 닫기 버튼 */}
            <IconButton
              onClick={loginClick}
              aria-label="close"
              size="large"
              className={styles.close}
            >
              <CloseRoundedIcon style={{ color: 'white', fontSize: 40 }} />
            </IconButton>
          </div>

          <Grid
            container
            spacing={3}
            className={styles.gap6}
            alignItems="center"
          >
            {/* 부모 or 아이 */}
            <Grid item xs={12} sm={6}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="ROLE"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel
                    value="CHILD"
                    control={
                      <Radio
                        sx={{
                          color: 'white',
                          '&.Mui-checked': {
                            color: 'white',
                          },
                          '& .MuiSvgIcon-root': {
                            fontSize: 25,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: 18, color: 'white' }}>
                        아이
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="PARENT"
                    control={
                      <Radio
                        sx={{
                          color: 'white',
                          '&.Mui-checked': {
                            color: 'white',
                          },
                          '& .MuiSvgIcon-root': {
                            fontSize: 25,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: 18, color: 'white' }}>
                        부모
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* 부모님 초대코드, 아이를 선택했을 때만 표시 */}
            {role === 'CHILD' && (
              <Grid
                item
                xs={12}
                sm={6}
                className={`${styles.gap5} ${styles.paddings}`}
              >
                <TextField
                  fullWidth
                  id="parentCode"
                  label="부모님 초대코드"
                  type="text"
                  variant="standard"
                  color="primary"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  inputProps={{
                    style: {
                      fontSize: 22,
                      color: 'white',
                      caretColor: 'white',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: 20,
                      color: 'white',
                    },
                  }}
                  sx={{
                    '& .MuiInput-underline:before': {
                      borderBottom: '2px solid #B0BEC5',
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: 'white',
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                      borderBottomColor: 'white',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'white',
                      opacity: 1,
                    },
                  }}
                />
              </Grid>
            )}
          </Grid>

          <Grid container spacing={3} className={styles.gap1}>
            {/* 성별 */}
            <Grid item xs={12} sm={4} className={styles.paddings}>
              <FormControl
                variant="standard"
                sx={{ my: 1, minWidth: 120, color: 'white' }}
              >
                <InputLabel
                  id="gender"
                  sx={{
                    color: 'white',
                    fontSize: 20,
                    '&.Mui-focused': { color: 'white' },
                  }}
                >
                  성별
                </InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  sx={{
                    color: 'white',
                    fontSize: 22,
                    '&:before': {
                      borderBottom: '2px solid #B0BEC5',
                    },
                    '&:hover:before': {
                      borderBottom: '2px solid white !important',
                    },

                    '&:after': {
                      borderBottomColor: 'white',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value={'WOMAN'} sx={{ fontSize: 20 }}>
                    여자
                  </MenuItem>
                  <MenuItem value={'MAN'} sx={{ fontSize: 20 }}>
                    남자
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8} className={styles.paddings}>
              {/* 생년월일 */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ width: '215px', marginLeft: 25 }}>
                  <DemoContainer components={['DateField']}>
                    <DateField
                      format="YYYY/MM/DD"
                      variant="standard"
                      color="primary"
                      label="생년월일"
                      value={birthDate}
                      onChange={(newValue) => {
                        setBirthDate(newValue ? newValue : dayjs('2024-03-26'))
                      }}
                      inputProps={{
                        style: {
                          fontSize: 22,
                          color: 'white',
                          caretColor: 'white',
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: 20,
                          color: 'white',
                        },
                      }}
                      sx={{
                        '& .MuiInput-underline:before': {
                          borderBottom: '2px solid #B0BEC5',
                        },
                        '& .MuiInput-underline:after': {
                          borderBottomColor: 'white',
                        },
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before':
                          {
                            borderBottomColor: 'white',
                          },
                        '& .MuiInputBase-input::placeholder': {
                          color: 'white',
                          opacity: 1,
                        },
                      }}
                    />
                  </DemoContainer>
                </div>
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid container spacing={3} className={styles.gap3}>
            {/* 이름 */}
            <Grid item xs={12} sm={5} className={styles.paddings}>
              <TextField
                fullWidth
                id="name"
                label="이름"
                type="text"
                variant="standard"
                color="primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputProps={{
                  style: {
                    fontSize: 22,
                    color: 'white',
                    caretColor: 'white',
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: 20,
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiInput-underline:before': {
                    borderBottom: '2px solid #B0BEC5',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'white',
                    opacity: 1,
                  },
                }}
              />
            </Grid>
            {/* 이메일 */}
            <Grid item xs={12} sm={7} className={styles.paddings}>
              <TextField
                fullWidth
                id="email"
                label="이메일"
                type="text"
                variant="standard"
                color="primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputProps={{
                  style: {
                    fontSize: 22,
                    color: 'white',
                    caretColor: 'white',
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: 20,
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiInput-underline:before': {
                    borderBottom: '2px solid #B0BEC5',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'white',
                    opacity: 1,
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className={styles.gap}>
            {/* 비밀번호 필드 */}
            <Grid item xs={12} sm={6} className={styles.paddings}>
              <TextField
                fullWidth
                id="password"
                label="비밀번호"
                type="password"
                variant="standard"
                color="primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{
                  style: {
                    fontSize: 22,
                    color: 'white',
                    caretColor: 'white',
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: 20,
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiInput-underline:before': {
                    borderBottom: '2px solid #B0BEC5',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottom: '2px solid white',
                  },
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottom: '2px solid white',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'white',
                    opacity: 1,
                  },
                }}
              />
            </Grid>

            {/* 비밀번호 확인 필드 */}
            <Grid item xs={12} sm={6} className={styles.paddings}>
              <TextField
                fullWidth
                id="confirm"
                label="비밀번호 확인"
                type="password"
                variant="standard"
                color="primary"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                inputProps={{
                  style: {
                    fontSize: 22,
                    color: 'white',
                    caretColor: 'white',
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: 20,
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiInput-underline:before': {
                    borderBottom: '2px solid #B0BEC5',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottom: '2px solid white',
                  },
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottom: '2px solid white',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'white',
                    opacity: 1,
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* 회원가입 완료 버튼 */}
          <div className={`${styles.button} ${styles.login}`}>
            <button type="submit" onClick={completeClick}>
              <span>회원가입</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
