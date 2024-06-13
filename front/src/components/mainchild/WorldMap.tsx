import React, { startTransition, useEffect, useState } from 'react'
import styles from './worldmap.module.css'
import { useNavigate } from 'react-router-dom'
import { progress } from '@/api/child'
import { countrydetailState } from '@/state/StageSubjectAtoms'
import { useRecoilState } from 'recoil'
import Navbar from './navbar'
import backUSA from '../../assets/back_usa.png'
import backJapan from '../../assets/back_japan.png'
import backItaly from '../../assets/back_italy.png'
import backChina from '../../assets/back_china.png'
import Lottie from 'lottie-react'
import japan from '../../assets/lottie/japan-location-pin.json'
import china from '../../assets/lottie/china-location-pin.json'
import italy from '../../assets/lottie/italy-location-pin.json'
import usa from '../../assets/lottie/usa-location-pin.json'

const Worldmap: React.FC = () => {
  const [countryId, setCountryId] = useRecoilState(countrydetailState)
  const [isTutorial, setIsTutorial] = useState('')
  const [fuel, setFuel] = useState('')
  const [usaProgressRate, setUsaProgressRate] = useState('')
  const [euProgressRate, setEuProgressRate] = useState('')
  const [japanProgressRate, setJapanProgressRate] = useState('')
  const [chinaProgressRate, setChinaProgressRate] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProgressRate = async () => {
      try {
        const response = await progress()
        console.log(response.data.data)
        setIsTutorial(response.data.data.isTutorial)
        setFuel(response.data.data.fuel)
        setUsaProgressRate(response.data.data.progressRateList[0].progressRate)
        setJapanProgressRate(
          response.data.data.progressRateList[1].progressRate
        )
        setEuProgressRate(response.data.data.progressRateList[2].progressRate)
        setChinaProgressRate(
          response.data.data.progressRateList[3].progressRate
        )
      } catch (error) {
        console.error('API 요청 중 오류 발생: ', error)
      }
    }
    fetchProgressRate()
  }, [])
  const navigatToUSA = () => {
    setCountryId(1)
    // startTransition을 사용하여 비동기 업데이트 처리
    startTransition(() => {
      navigate('/mainchild/usa')
    })
  }
  const navigatToItaly = () => {
    setCountryId(3)
    // startTransition을 사용하여 비동기 업데이트 처리
    startTransition(() => {
      navigate('/mainchild/italy')
    })
  }
  const navigatToJapn = () => {
    setCountryId(2)
    // startTransition을 사용하여 비동기 업데이트 처리
    startTransition(() => {
      navigate('/mainchild/japan')
    })
  }
  const navigatToChina = () => {
    setCountryId(4)
    // startTransition을 사용하여 비동기 업데이트 처리
    startTransition(() => {
      navigate('/mainchild/china')
    })
  }
  const handleClose = () => {
    // 여기에 닫기 로직을 구현합니다.
    console.log('Navbar 닫기')
  }

  // 기존의 state들...
  const [backgroundImage, setBackgroundImage] = useState('') // 배경 이미지 상태 추가

  // 마우스 이벤트 핸들러 함수
  const handleMouseEnter = (image: string) => {
    setBackgroundImage(`url(${image})`)
  }

  const handleMouseLeave = () => {
    setBackgroundImage('') // 마우스가 떠나면 배경 이미지를 제거하거나 기본 이미지로 설정
  }
  return (
    <div className={styles.backgroundIMG} style={{ backgroundImage }}>
      <div className="preload-images" style={{ display: 'none' }}>
        <img src={backUSA} alt="USA Preload" />
        <img src={backJapan} alt="Japan Preload" />
        <img src={backItaly} alt="Italy Preload" />
        <img src={backChina} alt="China Preload" />
      </div>
      <div className={styles.navbar}>
        <Navbar onClose={handleClose} />
      </div>

      <div
        className={styles.usapin}
        onClick={navigatToUSA}
        onMouseEnter={() => handleMouseEnter(backUSA)}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.tag}>
          미국 <br /> {usaProgressRate}%
        </div>
        <Lottie
          animationData={usa}
          style={{ width: '8vw', height: '8vw', marginRight: '6px' }}
        />
      </div>
      <div
        className={styles.italypin}
        onClick={navigatToItaly}
        onMouseEnter={() => handleMouseEnter(backItaly)}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.tag1}>
          이탈리아 <br /> {euProgressRate}%{' '}
        </div>
        <Lottie
          animationData={italy}
          style={{ width: '8vw', height: '8vw', marginRight: '6px' }}
        />
      </div>
      <div
        className={styles.japanpin}
        onClick={navigatToJapn}
        onMouseEnter={() => handleMouseEnter(backJapan)}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.tag}>
          일본
          <br />
          {japanProgressRate}%
        </div>
        <Lottie
          animationData={japan}
          style={{ width: '8vw', height: '8vw', marginRight: '6px' }}
        />
      </div>
      <div
        className={styles.chinapin}
        onClick={navigatToChina}
        onMouseEnter={() => handleMouseEnter(backChina)}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.tag}>
          중국 <br /> {chinaProgressRate}%
        </div>
        <Lottie
          animationData={china}
          style={{ width: '8vw', height: '8vw', marginRight: '6px' }}
        />
      </div>
      <div className={styles.fuel}></div>
      <div className={styles.fueltext}>연료 {fuel}%</div>
      <div className={styles.timemachine}></div>
    </div>
  )
}

export default Worldmap
