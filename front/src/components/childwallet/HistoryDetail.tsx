import React, { useEffect, useState } from 'react'
import { history } from "@/api/child"
import styles from "./HistoryDetail.module.css";
import wallet from "@/assets/wallet.png";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import complete from "@/assets/moneycomplete.png";
import request from "@/assets/moneysending.png";
import usalottie from "@/assets/lottie/america.json";
import japanlottie from "@/assets/lottie/japan.json";
import europelottie from "@/assets/lottie/europe.json";
import chinalottie from "@/assets/lottie/china.json";
import star from "@/assets/lottie/one-star-badge.json";
import Lottie from "lottie-react";

interface HistoryDetailProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    countryId: number
    frType : string
    frCode : string
}

interface historyDetail {
    historyId: number
    stageId: number
    price: number
    date: string
}

const HistoryDetail: React.FC<HistoryDetailProps> = ({ open, setOpen, countryId , frType, frCode}) => {
    const [historyData, setHistoryData] = useState(new Array<historyDetail>());
    
    useEffect(() => {
        history(countryId)
            .then(response => {
                const temp = new Array<historyDetail>();
                for (const his of response.data.data.historyList) {
                    temp.push({ historyId: his.historyId, stageId: his.stageId, price: his.price, date: his.date });
                }
                setHistoryData(temp);
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    return (
        <div className={styles.container}>
            <Lottie
                animationData={
                    frCode === 'USD'
                        ? usalottie
                        : frCode === 'JPY'
                            ? japanlottie
                            : frCode === 'EUR'
                                ? europelottie
                                : frCode === 'CNH'
                                    ? chinalottie
                                    : null // 기본값 혹은 일치하는 코드가 없을 경우
                }
                style={{ width: '4.5vw', height: '4.5vw', marginBottom: '10px' }}
            />
            {/* 기간 필터 */}
            {/* 각각 내역 */}
            {historyData.length > 0 ? (
                historyData.map((his, index) => (
                    <div key={index} className={styles.historycontent}>
                        <div className={styles.date}>
                            {new Date(his.date).toLocaleDateString(
                                'ko-KR',
                                {
                                    month: 'long',
                                    day: 'numeric',
                                    weekday: 'short', // 요일 표시
                                    hour: '2-digit', // 2자리 숫자로 시간 표시
                                    minute: '2-digit', // 2자리 숫자로 분 표시
                                    second: '2-digit', // 2자리 숫자로 초 표시
                                    hour12: false, // 24시 형식
                                }
                            )}
                        </div>
                        <div className={styles.detail}>
                            <div className={styles.subdetail1}>
                                <div className={styles.sub1text1}>
                                    {index + 1}.{his.stageId}
                                </div>
                            </div>
                            <div className={styles.subdetail2}>
                                <div className={styles.sub2text1}>
                                    <Lottie
                                        animationData={star}
                                        style={{ width: '1.5vw', height: '1.5vw' }}
                                    />
                                    <span>{his.price} {frCode}</span> {/* 텍스트를 <span> 태그로 감쌉니다 */}
                                </div>
                            </div>

                        </div>
                    </div>
                ))
            ) : (
                <div className={styles.noDataMessage}>히스토리 데이터가 없습니다.</div>
            )}
        </div>



    )
}

export default HistoryDetail