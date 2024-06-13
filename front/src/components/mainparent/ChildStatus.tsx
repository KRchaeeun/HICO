import React, { useState, useEffect } from 'react'
import styles from './childstatus.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { useNavigate } from 'react-router-dom'
import profileBoy1 from '../../assets/profile_boy1.png'
import profileBoy2 from '../../assets/profile_boy2.png'
import profileBoy3 from '../../assets/profile_boy3.png'
import profileBoy4 from '../../assets/profile_boy4.png'
import profileGirl1 from '../../assets/profile_girl1.png'
import profileGirl2 from '../../assets/profile_girl2.png'
import profileGirl3 from '../../assets/profile_girl3.png'
import profileGirl4 from '../../assets/profile_girl4.png'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import ChildAdd from './ChildAdd'
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import { useRecoilValue, useRecoilState } from 'recoil'
import { childIdState } from '@/state/Parentatoms'
import { useNavigate } from 'react-router-dom';
import {
  childrenListState,
  getChildStudyList,
  getChildPointList,
} from '@/state/Parentselectors'

const countries = ['usa', 'japan', 'italy', 'china'] // 캐로셀 배열

interface ChartData {
  progress: number
  total: number
  correct: number
  datasets: Array<{
    data: number[]
    backgroundColor: string[]
    hoverOffset: number
    borderRadius?: number
  }>
}

interface DataMap {
  [key: string]: ChartData
}

// `studyStatusList`의 타입을 정의
interface StudyStatus {
  countryId: number
  countryName: string
  progressRate: number
  correct: number
}
// 포인트 현황 오브젝트 타입 정의
interface ChildPoint {
  frPointId: number
  frType: string
  point: number
  code: string
}
// `generateDataMap` 함수의 반환 타입으로 `DataMap` 인터페이스를 사용
const generateDataMap = (list: StudyStatus[]): DataMap => {
  const dataMap: DataMap = {}
  // list가 배열인지 확인하고, 그렇지 않은 경우 함수를 종료합니다.
  if (!Array.isArray(list)) {
    console.error('list is not an array:', list)
    return dataMap // 빈 객체를 반환하거나 적절한 기본값을 설정합니다.
  }

  list.forEach((item) => {
    const key: string = item.countryName.toLowerCase()
    dataMap[key] = {
      progress: item.progressRate,
      total: 50, // 예시로 전체 진행률을 100으로 가정
      correct: item.correct,
      datasets: [
        {
          data: [item.progressRate, 100 - item.progressRate],
          backgroundColor: ['#0064FF', '#F5F5F5'],
          hoverOffset: 4,
          borderRadius: 5,
        },
      ],
    }
  })
  return dataMap
}
// 자녀 객체의 타입 정의
type Child = {
  id: number
  name: string
}

const Childstatus: React.FC = () => {
  const navigate = useNavigate();
  // 자녀 아이디, 자녀 이름 불러오기
  const [childId, setChildId] = useRecoilState(childIdState)
  const [childName, setChildName] = useState('')
  const [prevSelectedId, setPrevSelectedId] = useState(childId)
  // 자녀 리스트 가져오기
  const ChildList = useRecoilValue(childrenListState)
  // 자녀 학습 현황
  const childStudyList = useRecoilValue(getChildStudyList)
  // 컴포넌트가 마운트될 때 첫 번째 자녀를 기본값으로 설정
  useEffect(() => {
    if (ChildList.length > 0) {
      const firstChild = ChildList[0]
      setChildId(firstChild.id)
      setChildName(firstChild.name)
    }
    // console.log(childStudyList)
  }, [ChildList]) // ChildList가 변경될 때마다 이 효과 실행

  // 선택 변경 시 자녀의 ID와 이름을 업데이트
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedId = parseInt(event.target.value, 10) // 선택된 ID를 숫자로 변환
    const selectedChild = ChildList.find(
      (child: any) => child.id === selectedId
    )

    if (selectedChild) {
      setPrevSelectedId(childId) // 현재 선택된 ID를 이전에 선택된 ID로 설정
      setChildId(selectedId)
      setChildName(selectedChild.name)
    }
  }
  useEffect(() => {
    if (prevSelectedId !== childId) {
      // 이전에 선택된 ID와 현재 선택된 ID가 다를 경우에만 UI를 업데이트
      setPrevSelectedId(childId)
    }
  }, [childId, prevSelectedId])
  const [selectedImage, setSelectedImage] = useState('')

  // 프로필 랜덤 사진
  // 예시로 'boy'로 설정. 동적으로 설정 필요.
  const gender = 'boy' // 'boy' 또는 'girl'
  useEffect(() => {
    const boyImages = [profileBoy1, profileBoy2, profileBoy3, profileBoy4]
    const girlImages = [profileGirl1, profileGirl2, profileGirl3, profileGirl4]
    const images = gender === 'boy' ? boyImages : girlImages
    const randomIndex = Math.floor(Math.random() * images.length)
    setSelectedImage(images[randomIndex])
  }, [gender])

  // useEffect(() => {
  //   const boyImages = [profileBoy1, profileBoy2, profileBoy3, profileBoy4]
  //   const girlImages = [profileGirl1, profileGirl2, profileGirl3, profileGirl4]
  //   const randomIndex = Math.floor(Math.random() * images.length)
  //   setSelectedImage(images[randomIndex])
  // }, [])

  // 자녀학습현황 불러오기
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [dataMap, setDataMap] = useState<DataMap>({})
  useEffect(() => {
    if (childStudyList && childStudyList.data) {
      const studyStatusList = childStudyList.data // 여기서 studyStatusList를 정의합니다.
      // console.log('자녀학습현황', studyStatusList)
      setDataMap(generateDataMap(studyStatusList))
    }
  }, [childStudyList])
  // 캐로셀 위치 조정 함수
  const handlePreviousClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }
  const handleNextClick = () => {
    if (currentIndex < countries.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }
  const countries = Object.keys(dataMap) // dataMap에서 국가 이름 목록을 추출
  const currentCountry = countries[currentIndex] || `""`
  const currentData = dataMap[currentCountry]

  //  추가등록 모달
  const [open, setOpen] = useState(false)
  // const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 40,
    borderRadius: '8px',
  }
  // 자녀 포인트 가져오기
  const childPointList = useRecoilValue(getChildPointList);
  const [pointStatusList, setPointStatusList] = useState<ChildPoint[]>([])
  useEffect(() => {
    if(childPointList.length === 0){
      navigate('/mainparent/nochild');
    }
    if (childPointList && Array.isArray(childPointList.data)) {
      setPointStatusList(childPointList.data)
    }
  }, [childPointList])

  return (
    <div className={styles.container}>
      {/* 프로필 */}
      <div className={styles.profile}>
        {/* 프로필 사진 */}
        <div className={styles.profileimage}>
          <img src={selectedImage} alt={gender} style={{ height: '110px' }} />
        </div>

        {/* 자녀 이름 */}
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={childId.toString()} // Recoil state를 string으로 변환하여 사용
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              disableUnderline
              IconComponent={ExpandMoreRoundedIcon}
              sx={{
                '.MuiSelect-select': {
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#585865',
                },
                '.MuiSvgIcon-root': {
                  fontSize: '45px',
                  paddingBottom: '5px',
                },
              }}
            >
              {ChildList.map((child: any) => (
                <MenuItem key={child.id} value={child.id.toString()}>
                  {child.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* 아이 추가등록 */}
        <div className={styles.registermore}>
          <Button color="primary" onClick={() => setOpen(true)}>
            아이 추가등록
          </Button>
        </div>
      </div>

      {/* 아이 추가등록 모달 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-add-modal-title"
        aria-describedby="child-add-modal-description"
      >
        <Box sx={style}>
          <ChildAdd handleClose={handleClose} />
        </Box>
      </Modal>

      {/* 메인1 */}
      <div className={styles.materialContainer}>
        {/* 카로셀 버튼 + 나라 */}
        <div className={styles.carouselcontrols}>
          <IconButton
            aria-label="previous"
            onClick={handlePreviousClick}
            disabled={currentIndex === 0}
          >
            <ArrowBackIosRoundedIcon />
          </IconButton>
          <div className={styles.countrytext}>{countries[currentIndex]}</div>
          <IconButton
            aria-label="next"
            onClick={handleNextClick}
            disabled={currentIndex === countries.length - 1}
          >
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </div>

        {/* 진행률 차트 */}
        {currentData && (
          <div>
            {/* <div> 사이즈 설정 */}
            <div>
              <Doughnut
                data={{
                  labels: ['Progress', 'Remaining'],
                  datasets: currentData.datasets,
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>

            <div className={styles.progresslayout}>
              <div className={styles.title1}>학습진행률</div>
              <div className={styles.subtitle1}>{currentData.progress}%</div>
            </div>
            <div className={styles.correctlayout}>
              <div className={styles.title2}>전체 문항수</div>
              <div className={styles.subtitle2}>{currentData.total}</div>
              <div className={styles.subtitle4}>개</div>
              <div className={styles.title3}>맞은 문항수</div>
              <div className={styles.subtitle3}>{currentData.correct}</div>
              <div className={styles.subtitle5}>개</div>
            </div>
          </div>
        )}
        {/* 보유외화포인트 */}
        <div className={styles.materialContainer2}>
          {/* title */}
          <div className={styles.secondtitle}>현재 보유 외화 포인트</div>
          {/* 나라 */}
          <div className={styles.countrylayout}>
            {pointStatusList.map((point: ChildPoint) => (
              <div className={styles.eachcountry} key={point.frPointId}>
                <div className={styles.countryname}>{point.frType}</div>
                <div className={styles.countryInfo}>
                  <div className={styles.countrynum}>
                    {point.point.toFixed(2)}
                  </div>
                  <div className={styles.countrymoney}>{point.code}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Childstatus
