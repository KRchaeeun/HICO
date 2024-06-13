import React from 'react'
import styles from '@/components/mainchild/Result.module.css'
const quizsuccess = require('@/assets/success.png')
const quizfailed = require('@/assets/failed.png')
import { stageSubjectState } from '@/state/StageSubjectAtoms'
import { useRecoilState } from "recoil";
import { countrydetailState } from "@/state/StageSubjectAtoms"
import { useNavigate } from 'react-router-dom'

interface QuizResultProps {
  open: boolean // 모달 오픈 상태
  setOpen: React.Dispatch<React.SetStateAction<boolean>> // 모달 오픈 상태를 변경하는 함수
  count: number
  price: number
}

const Result: React.FC<QuizResultProps> = ({ open, setOpen, count, price }) => {
  const navigate = useNavigate();
  const [countryId, setCountryId] = useRecoilState(countrydetailState);
  const [stageId, setStageId] = useRecoilState(stageSubjectState);
  const money = ['', '달러', '엔', '유로', '위안']
  const path = ['', 'usa', 'japan', 'italy', 'china'];

  const nextStage = () => {
    if (stageId >= 5) {
      alert('모든 스테이지를 클리어했습니다.');
      navigate(path[countryId]);
    } else {
      setStageId(prev => prev += 1);
      navigate('/mainchild/stage/' + path[countryId]);
    }
  }
  const retry = () => {
    location.reload();
  }
  const close = () => {
    navigate('/mainchild/' + path[countryId]);
  }

  let result, fuel, next, coin;
  if (count >= 7) {
    result = <div>성공</div>
    fuel = <div>연료 5% 충전</div>
    next = <button className={styles.button} onClick={nextStage}>다음 스테이지</button>
    coin = <div>코인 + {price} {money[countryId]}</div>
  } else {
    result = <div>실패</div>
    next = <button className={styles.button} onClick={retry}>재도전</button>
  }

  return (
    <div className={styles.componentContainer}>
      <div className={styles.header}>
        스테이지{stageId}<button className={styles.closeButton} onClick={close}>X</button>
      </div>
      <div className={styles.title}>10개 중 {count}개 정답</div>
      <img
        src={count >= 7 ? quizsuccess : quizfailed}
        alt="Character"
        className={styles.characterImage}
      />
      <div className={styles.info}>
        {result}
        {fuel}
        {coin}
      </div>
      {next}
    </div>
  )
}

export default Result
